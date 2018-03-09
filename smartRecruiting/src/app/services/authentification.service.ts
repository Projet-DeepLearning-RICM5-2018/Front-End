import { Injectable } from '@angular/core';
import { User } from '../shared/user';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_API } from '../shared/constants';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Injectable()
export class AuthentificationService {

  public admin = new BehaviorSubject<boolean>(this.initIsAdmin());
  public isConnected = new BehaviorSubject<boolean>(this.initIsConnected());
  public connectedUser = new BehaviorSubject<any>(this.initConnectedUser());
  public tokenUser = new BehaviorSubject<string>(this.initTokenUser());

  public globalLink = URL_API;

  admin$ = this.admin.asObservable();
  connectedUser$ = this.connectedUser.asObservable();
  tokenUser$ = this.tokenUser.asObservable();
  isConnected$ = this.isConnected.asObservable();

  constructor(
    public router: Router,
    private http: HttpClient
  ) { }

  /*________________________ GETTER ADN SETTER ________________________*/

  //Boolean : isAdmin
  public getAdmin(): BehaviorSubject<boolean> {return this.admin;}
  public setAdmin(isAdmin: boolean): void {
    this.admin.next(isAdmin);
    localStorage.setItem('isAdmin', '' + this.admin.value);
  }
  private initIsAdmin(){return localStorage.getItem('isAdmin')?localStorage.getItem('isAdmin') == 'true':false;}

  //Object : connectedUser
  public getConnectedUser(): BehaviorSubject<any> {return this.connectedUser;}
  public setConnectedUser(user: User): void {
    this.connectedUser.next(user);
    localStorage.setItem('connectedUser', JSON.stringify(this.connectedUser.value));
  }
  private initConnectedUser() {
    if (localStorage.getItem('connectedUser')){
      let retrieveObject = localStorage.getItem('connectedUser');
      return JSON.parse(retrieveObject);
    } else {return undefined;}
  }

  //String : Token
  public getTokenUser(): BehaviorSubject<string> {return this.tokenUser;}
  public setTokenUser(token: string): void {
    this.tokenUser.next(token);
    localStorage.setItem('token', this.tokenUser.value);
  }
  private initTokenUser() {return localStorage.getItem('token')?localStorage.getItem('token'):"";}

  //Boolean : isConnected
  public getIsConnected(): BehaviorSubject<boolean> {return this.isConnected;}
  public setIsConnected(b: boolean): void {this.isConnected.next(b);}
  private initIsConnected() {
    return localStorage.getItem('token')?true:false;
  }

  createHeader(){
    return {
      headers: new HttpHeaders({
        'Authorization' : 'Bearer ' + this.tokenUser.value,
      })
    };
  }

  /*________________________ SIGNIN SIGNUP ________________________*/
  // Send a connexion request to the back-end
  // return an observable
  connexionUser(mail: string, psw: string) {
    var body = JSON.stringify({emailUser: mail,password: psw});
    return this.http.post(this.globalLink + '/auth/login', body);
  }

  // Send a registration request to the back-end
  // return an observable
  registrationUser(newUser: User) {
    var body = JSON.stringify({
      name : newUser.name,
      surname : newUser.surname,
      role : newUser.role,
      email : newUser.email,
      password : newUser.password,
    });
    return this.http.post(this.globalLink + '/auth/signup', body);
  }

  // Disconnect user
  disconnect() {return this.http.post(this.globalLink + '/auth/logout',{}, this.createHeader());}

  // Init the different field of the service
  cleanUserConnexionData() {
    //Erase in local storage
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('connectedUser');
    localStorage.removeItem('token');
    //Erase in service
    this.connectedUser.next(undefined);
    this.tokenUser.next('');
    this.admin.next(false);
    this.setIsConnected(false);
  }

  // Set the different field of the service
  setConnexionData(data) {
    this.setConnectedUser(data.user);
    this.setTokenUser(data.token);
    this.setAdmin(data.user.is_admin);
    this.setIsConnected(true);
  }

  /*________________________ MODIFY DATA USER ________________________*/
  updateDataUser(newData){
    console.log(newData.id);
    var sendUpdate = {}
    if (newData.name != this.connectedUser.value.name){
      sendUpdate['name'] = newData.name;
    }
    if (newData.surname != this.connectedUser.value.surname){
      sendUpdate['surname'] = newData.surname;
    }
    if (newData.role != this.connectedUser.value.role){
      sendUpdate['role'] = newData.role;
    }
    if (newData.password != ''){
      sendUpdate['password'] = newData.password;
    }

    this.setConnectedUser(newData);
    console.log(this.connectedUser.value.id);

    var body = JSON.stringify(sendUpdate);
    return this.http.put(this.globalLink + '/users/'+this.connectedUser.value.id, body, this.createHeader());
  }

  eraseUser(){
    this.disconnect().subscribe(
      data => {
        console.log("Disconect");
        this.http.delete(this.globalLink +'/users/'+this.connectedUser.value.id, this.createHeader()).subscribe(
          data => {
            console.log("Erased");
            this.cleanUserConnexionData();
            this.router.navigate(['/']);
          },
          error => {
            console.log(error);
          });
      },
      error => {
        console.log(error);
      }
    );
  }

}
