import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap, retry } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

import { URL_API } from '../shared/constants'

@Injectable()
export class OfferService {
  private globalLink = URL_API;
  /*
  httpOptions = {
    headers: new HttpHeaders({
      'Autorization' : 'Bearer '+token
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    })
  };*/

  constructor(private http : HttpClient) { }



  getOfferForConnectedClient(id :number, token:string){
    var httpOptions = {
      headers: new HttpHeaders({
        'Authorization' : 'Bearer '+token
      })
    };

    return this.http.get(this.globalLink+'/searchOffersByUser/'+id,httpOptions)
  }

}
