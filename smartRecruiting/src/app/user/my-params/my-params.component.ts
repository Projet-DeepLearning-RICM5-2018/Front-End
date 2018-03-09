import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../../services/authentification.service';
import { UserService } from '../../services/user.service';
import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-my-params',
  templateUrl: './my-params.component.html',
  styleUrls: ['./my-params.component.css']
})
export class MyParamsComponent implements OnInit {

  public userAccount :any;
  public verifPassword : string = '';
  public modyfing : boolean = false;
  public erreurServeur : boolean;
  public motDePasseNonIdentique : boolean;

  private modalDanger: NgbModalRef;

  constructor(
    private modalService: NgbModal,
    private _auth : AuthentificationService,
    private _userService : UserService,
  ) { }

  ngOnInit() {
    //{id: number;name: string;surname : string;role : string;email:string;password : string;isAdmin : boolean;}
    this.initAccountUserValue();
  }

  initAccountUserValue(){
    let savedUserValue = this._auth.getConnectedUser().value;
    this.userAccount = JSON.parse(JSON.stringify(savedUserValue))
    this.userAccount.password = '';
  }

  modifierUser(){
    console.log(this.userAccount);
    this.modyfing = true;
    this.userAccount.password = '';
  }

  annuler(){
    this.initAccountUserValue();
    this.modyfing = false;
  }

  save(){
    if(this.userAccount.password != this.verifPassword){this.motDePasseNonIdentique = true;}
    else{
      this.motDePasseNonIdentique = false;
      let copy = JSON.parse(JSON.stringify(this.userAccount));
      this._auth.updateDataUser(copy).subscribe(
        data => {
          this.erreurServeur = true;
          this.modyfing = false;
          this.userAccount.password = "";
        },
        error => {this.erreurServeur = true;}
      );
    }
  }

  erasedUser(){this._auth.eraseUser();}

  openDangerPopUp(danger){
    this.modalDanger = this.modalService.open(danger);
    this.modalDanger.result.then(
      (result) => {
        if(result=="yes"){
          this.erasedUser()
        }
      },
      (reason) => {console.log('');}
    );

  }


}
