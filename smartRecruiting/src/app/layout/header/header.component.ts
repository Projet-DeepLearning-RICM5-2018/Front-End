import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../shared/user';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public connected : boolean;
  public admin : boolean;
  public emailUser : string = "";
  public passwordUser : string = "";
  public newUser : User = {id:1, name: "", surname:"", role:"", email:"", password: "", isAdmin:false};

  public validForm : boolean = true;

  private modalLog: NgbModalRef;
  private modalSign: NgbModalRef;

  form: FormGroup;

  constructor(private modalService: NgbModal,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.connected = false;
    this.admin = false;
    this.initForm();
  }

  get name() {return this.form.get('name');}
  get surname() {return this.form.get('surname');}
  get role() {return this.form.get('role');}
  get email() {return this.form.get('email');}
  get password() {return this.form.get('password');}

  initForm():void{
    this.form = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'surname': new FormControl(null, Validators.required),
      'role': new FormControl(null, Validators.required),
      'email': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required)
    });
  }

  connect(login) {
    this.modalLog = this.modalService.open(login);
    this.modalLog.result.then((result) => {
      console.log("close");
    }, (reason) => {
      console.log("dissmiss");
    });
  }

  register(signup) {
    /**TODO*/

    this.modalSign = this.modalService.open(signup);
    this.modalSign.result.then((result) => {
      console.log("close");
    }, (reason) => {
      console.log(this.newUser)
      this.initForm();
      this.newUser = {id:1, name: "", surname:"", role:"", email:"", password: "", isAdmin:false};
      console.log("dissmiss");
    });
  }

  validateConnexion(){
    /**TODO*/
    if( this.emailUser=="" || this.passwordUser==""){
        this.validForm = false;
    }
    else{
      this.connected = true;
      this.admin = true;
      this.modalLog.close();
    }

  }

  validateRegistration(){
    console.log(this.newUser);
  }

  disconnect() {
    this.connected = false;
    this.admin = false;
  }


}
