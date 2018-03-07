import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {URL_API} from '../shared/constants';
import { AuthentificationService } from './authentification.service';


@Injectable()
export class FieldService {

  private genericRoute = URL_API;
  private fieldsRoute = this.genericRoute + '/fields';
  
  constructor(
    private http: HttpClient,
    private _authentificationservice : AuthentificationService,
  ) { }

  createHeader(){
    return {
      headers: new HttpHeaders({
        'Authorization' : 'Bearer '+this._authentificationservice.getTokenUser().value
      })
    };
  }

  getAllFields() {
    return this.http.get(this.fieldsRoute, this.createHeader());
  }

  getField(fieldId) {
    return this.http.get(this.fieldsRoute + '/' + fieldId, this.createHeader());
  }

  createField(field) {
    const body = JSON.stringify({
      'name': field.name,
      'description': field.description,
      'descriptor': '',
      'website': field.website,
      'contacts' : field.contacts
    });
    return this.http.post(this.fieldsRoute, body, this.createHeader());
  }

  updateField(field) {
    const body = JSON.stringify({
      'name': field.name,
      'description': field.description,
      'descriptor': '',
      'website': field.website,
      'contacts' : field.contacts
    });
    return this.http.put(this.fieldsRoute + '/' + field.id, body, this.createHeader());
  }

  deleteField(field) {
    return this.http.delete(this.fieldsRoute + '/' + field.id, this.createHeader());
  }

   getFieldByOffer(idO) {
    var route = this.genericRoute+'/searchFieldsByOffer/'+idO;
    return this.http.get(route, this.createHeader());
  }

}
