import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {URL_API} from '../shared/constants';
import {AuthentificationService} from './authentification.service';

@Injectable()
export class ContactService {

  private contactsRoute = URL_API + '/contacts';

  constructor(
    private http: HttpClient,
    private _authentificationservice: AuthentificationService,
  ) { }

  createHeader() {
    return {
      headers: new HttpHeaders({
        'Authorization' : 'Bearer ' + this._authentificationservice.getTokenUser().value
      })
    };
  }

  createContact(fieldId, contact) {
    const body = JSON.stringify({
      'name': contact.name,
      'surname': contact.surname,
      'email': contact.email,
      'phone': contact.phone,
      'role': contact.role,
      'id_field': fieldId
    });
    return this.http.post(this.contactsRoute, body, this.createHeader());
  }

  updateContact(fieldId, contact) {
    const body = JSON.stringify({
      'name': contact.name,
      'surname': contact.surname,
      'email': contact.email,
      'phone': contact.phone,
      'role': contact.role,
      'id_field': fieldId
    });
    return this.http.put(this.contactsRoute + '/' + contact.id, body, this.createHeader());
  }

  deleteContact(contactId) {
    return this.http.delete(this.contactsRoute + '/' + contactId, this.createHeader());
  }

}
