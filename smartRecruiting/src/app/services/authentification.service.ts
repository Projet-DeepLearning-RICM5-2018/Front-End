import { Injectable } from '@angular/core';
import { User } from '../shared/user';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthentificationService {

  public connected = new BehaviorSubject<boolean>(false);
  public admin = new BehaviorSubject<boolean>(false);

  connected$ = this.connected.asObservable();
  admin$ = this.admin.asObservable();

  constructor() { }

  getConnected(): BehaviorSubject<boolean>{
    return this.connected;
  }

  setConnected(isCo:boolean): void {
    this.connected.next(isCo);
  }

  getAdmin(): BehaviorSubject<boolean>{
    return this.admin
  }

  setAdmin(isAdmin:boolean): void {
    this.admin.next(isAdmin);
  }

  connexionUser(mail:string, psw : string) : boolean {
    localStorage.setItem('token',"blop");
    return true;
  }

  registrationUser(newUser:User) : boolean {
    localStorage.setItem('token',"blop");
    return true;
  }

  disconect() : void {
    localStorage.setItem('token',undefined);
  }

}
