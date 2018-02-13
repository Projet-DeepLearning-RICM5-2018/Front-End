import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../shared/user';

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
  public newUser : User = new User();

  public validForm : boolean = true;

  private modalLog: NgbModalRef;
  private modalSign: NgbModalRef;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.connected = false;
    this.admin = false;
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
    
  }

  disconnect() {
    this.connected = false;
    this.admin = false;
  }

}
