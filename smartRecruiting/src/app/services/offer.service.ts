import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap, retry } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

import { URL_API } from '../shared/constants';
import {AuthentificationService} from './authentification.service';

@Injectable()
export class OfferService {
  private globalLink = URL_API;
  private offersRoute = URL_API + '/offers';

  /*
  httpOptions = {
    headers: new HttpHeaders({
      'Autorization' : 'Bearer '+token
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    })
  };*/

  constructor(
    private http: HttpClient,
    private _authentificationService: AuthentificationService
  ) { }


  buildHttpOptions(token) {
    return {
      headers: new HttpHeaders({
        'Authorization' : 'Bearer ' + token
      })
    };
  }

  getAllOffers() {
    const token = this._authentificationService.getTokenUser().value;
    const httpOptions = this.buildHttpOptions(token);
    return this.http.get(this.offersRoute, httpOptions);
  }


  getOfferForConnectedClient(id: number, token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization' : 'Bearer ' + token
      })
    };

    return this.http.get(this.globalLink + '/searchOffersByUser/' + id, httpOptions);
  }

}
