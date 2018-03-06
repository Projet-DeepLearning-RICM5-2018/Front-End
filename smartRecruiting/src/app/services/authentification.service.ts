import { Injectable } from '@angular/core';
import { User } from '../shared/user';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap, retry } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

/*
httpOptions = {
  headers: new HttpHeaders({
    'Autorization' : 'Bearer '+token
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  })
};
*/

@Injectable()
export class AuthentificationService {

  public connected = new BehaviorSubject<boolean>(false);
  public admin = new BehaviorSubject<boolean>(false);
  public connectedUser = new BehaviorSubject<User>(undefined);
  public tokenUser = new BehaviorSubject<string>("");

  public globalLink = "http://localhost:5555";

  connected$ = this.connected.asObservable();
  admin$ = this.admin.asObservable();
  connectedUser$ = this.connectedUser.asObservable();
  tokenUser$ = this.tokenUser.asObservable();

  constructor(private http: HttpClient) { }

  //Getter and setter
  getConnected(): BehaviorSubject<boolean>{return this.connected;}
  setConnected(isCo:boolean): void {this.connected.next(isCo);}

  getAdmin(): BehaviorSubject<boolean>{return this.admin}
  setAdmin(isAdmin:boolean): void {this.admin.next(isAdmin);}

  getConnectedUser(): BehaviorSubject<User>{return this.connectedUser;}
  setConnectedUser(user:User): void {this.connectedUser.next(user);}

  getTokenUser(): BehaviorSubject<string>{return this.tokenUser}
  setTokenUser(token:string): void {this.tokenUser.next(token);}

  //Send a connexion request to the back-end
  //return an observable
  connexionUser(mail:string, psw : string) {
    var body = JSON.stringify({
            emailUser: mail,
            password: psw
    });

    return this.http.post(this.globalLink+"/auth/login",body);
  }

  //Init the different field of the service
  initConnexionUser(){
    this.setConnected(false);
    this.setConnectedUser(undefined);
    this.setTokenUser("");
    this.setAdmin(false);
  }

  //Set the different field of the service
  setConnexionUser(data){
    this.setConnected(true);
    this.setConnectedUser(data.user);
    this.setTokenUser(data.token);
    this.setAdmin(data.user.is_admin==1);
  }

  //Send a resgistration request to the back-end
  //return an observable
  registrationUser(newUser:User) {
    var body = JSON.stringify({
    	name : newUser.name,
    	surname : newUser.surname,
    	role : newUser.role,
    	email : newUser.email,
    	password : newUser.password,
    });

    return this.http.post(this.globalLink+"/auth/signup",body);
  }

  //Disconnect user
  disconect() {
    var httpOptions = {
      headers: new HttpHeaders({
        'Authorization' : 'Bearer '+ this.tokenUser.value,
      })
    };

    return this.http.post(this.globalLink+"/auth/logout",{},httpOptions);
  }


}
