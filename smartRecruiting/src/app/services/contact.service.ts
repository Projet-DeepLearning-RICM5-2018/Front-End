import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {URL_API} from '../shared/constants';

@Injectable()
export class ContactService {

  private contactsRoute = URL_API + '/contacts';

  constructor(
    private http: HttpClient,
  ) { }

  createContact(fieldId, contact) {
    const body = JSON.stringify({
      'name': contact.name,
      'surname': contact.surname,
      'email': contact.email,
      'phone': contact.phone,
      'role': contact.role,
      'id_field': fieldId
    });
    return this.http.post(this.contactsRoute, body);
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
    return this.http.put(this.contactsRoute + '/' + contact.id, body);
  }

  deleteContact(contactId) {
    return this.http.delete(this.contactsRoute + '/' + contactId);
  }

}
