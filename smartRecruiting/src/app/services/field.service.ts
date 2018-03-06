import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FieldService {

  private fieldsRoute = 'http://localhost:5555/fields';

  constructor(
    private http: HttpClient,
  ) { }

  createField(field) {
    const body = JSON.stringify({
      'name': field.name,
      'description': field.description,
      'descriptor': '',
      'website': field.website
    });
    return this.http.post(this.fieldsRoute, body);
  }

  updateField(field) {
    const body = JSON.stringify({
      'name': field.name,
      'description': field.description,
      'descriptor': '',
      'website': field.website
    });
    return this.http.put(this.fieldsRoute + '/' + field.id, body);
  }

  deleteField(field) {
    return this.http.delete(this.fieldsRoute + '/' + field.id);
  }

}


