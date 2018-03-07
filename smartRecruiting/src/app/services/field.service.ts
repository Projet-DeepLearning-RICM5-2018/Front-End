import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {URL_API} from '../shared/constants';

@Injectable()
export class FieldService {

  private fieldsRoute = URL_API + '/fields';

  constructor(
    private http: HttpClient,
  ) { }

  getAllFields() {
    return this.http.get(this.fieldsRoute);
  }

  getField(fieldId) {
    return this.http.get(this.fieldsRoute + '/' + fieldId);
  }

  createField(field) {
    const body = JSON.stringify({
      'name': field.name,
      'description': field.description,
      'descriptor': '',
      'website': field.website,
      'contacts' : field.contacts
    });
    return this.http.post(this.fieldsRoute, body);
  }

  updateField(field) {
    const body = JSON.stringify({
      'name': field.name,
      'description': field.description,
      'descriptor': '',
      'website': field.website,
      'contacts' : field.contacts
    });
    return this.http.put(this.fieldsRoute + '/' + field.id, body);
  }

  deleteField(field) {
    return this.http.delete(this.fieldsRoute + '/' + field.id);
  }

   getAllFieldByOffer(idO, token) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Authorization' : 'Bearer '+token
      })
    };

    return this.http.get(URL_API+'searchFieldsByOffer/'+idO,httpOptions);
  }

}
