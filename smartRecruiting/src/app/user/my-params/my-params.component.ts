import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../../services/authentification.service';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-my-params',
  templateUrl: './my-params.component.html',
  styleUrls: ['./my-params.component.css']
})
export class MyParamsComponent implements OnInit {

  public userAccount :any;
  public modyfing : boolean = false;

  constructor(
    private _auth : AuthentificationService,
    private _userService : UserService,
  ) { }

  ngOnInit() {
    //{id: number;name: string;surname : string;role : string;email:string;password : string;isAdmin : boolean;}
    this.userAccount = this._auth.getConnectedUser().value;
    console.log(this.userAccount);
  }



}
