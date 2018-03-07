import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../shared/user';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthentificationService } from '../../services/authentification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  //Boolean use for display
  public connected : boolean;
  public admin : boolean;

  //Data for form
  public emailUser : string = "";
  public passwordUser : string = "";
  public newUser : User = {id:1, name: "", surname:"", role:"", email:"", password: "", isAdmin:false};
  form: FormGroup;
  //Boolean to check issue
  public validForm : boolean = true;
  public logError : boolean = false;
  public erreurServeur : boolean = false;
  public alreadyExist : boolean = false;

  //Modals
  private modalLog: NgbModalRef;
  private modalSign: NgbModalRef;

  constructor(private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private _authentificationservice:AuthentificationService) { }

  ngOnInit() {
    this.initForm();
    this._authentificationservice.connectedUser$.subscribe(item => {this.connected = item!=undefined})
    this._authentificationservice.connectedUser$.subscribe(item => {
      if(item){this.admin = item.is_admin;}
      else{this.admin = false;}
    });
  }

  //Init the form to set required value
  initForm():void{
    this.form = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'surname': new FormControl(null, Validators.required),
      'role': new FormControl(null, Validators.required),
      'email': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required)
    });
  }

  //Getter setter for the form validators
  get name() {return this.form.get('name');}
  get surname() {return this.form.get('surname');}
  get role() {return this.form.get('role');}
  get email() {return this.form.get('email');}
  get password() {return this.form.get('password');}

  //Open the connexion modal
  connect(login) {
    this.modalLog = this.modalService.open(login);
    this.modalLog.result.then(
      (result) => {
        console.log("close");
        this.emailUser = "";
        this.passwordUser = "";
      },
      (reason) => {console.log("dissmiss");});
  }

  //Open the registration modal
  register(signup) {
    this.modalSign = this.modalService.open(signup);
    this.modalSign.result.then(
      (result) => {console.log("close");},
      (reason) => {
        this.initForm();
        this.newUser = {id:1, name: "", surname:"", role:"", email:"", password: "", isAdmin:false};
        console.log("dissmiss");
    });
  }

  //Try to connect User or display error in the dom element
  validateConnexion(){
    if( this.emailUser=="" || this.passwordUser==""){
        this.validForm = false;
    }
    else{
      this._authentificationservice.connexionUser(this.emailUser, this.passwordUser)
        .subscribe(
          data => {
            this._authentificationservice.setConnexionUser(data);
            this.disabledDisplayingIssues();
            this.modalLog.close();
          },
          error => {
            console.log(error);
            if(error.status==404){this.logError = true;}
            else{this.erreurServeur = true;}
          }
        );
    }
  }

  //set error boolean to False
  disabledDisplayingIssues(){
    this.validForm = true;
    this.logError = false;
    this.erreurServeur = false;
    this.alreadyExist = false;
  }

 //Try to register User or display error in the dom element
  validateRegistration(){
    this._authentificationservice.registrationUser(this.newUser)
      .subscribe(
        data => {
          this._authentificationservice.setConnexionUser(data);
          this.disabledDisplayingIssues();
          this.initForm();
          this.newUser = {id:1, name: "", surname:"", role:"", email:"", password: "", isAdmin:false};
          this.modalSign.close();
        },
        error => {
          console.log(error);
          if(error.status==404){this.alreadyExist = true;}
          else{this.erreurServeur = true;}
        });
    }

  //disconnect a user
  disconnect() {
    this._authentificationservice.disconect().subscribe(
      data => {
        this._authentificationservice.initConnexionUser();
        console.log("Disconnect")
      },
      error => {
        console.log("Error")
      }
    );
  }


}
