import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { URL_API } from '../shared/constants';
import {AuthentificationService} from './authentification.service';

@Injectable()
export class OfferService {
  private globalLink = URL_API;
  private offersRoute = URL_API + '/offers';
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
    let token = this._authentificationService.getTokenUser().value;
    let httpOptions = this.buildHttpOptions(token);
    return this.http.get(this.offersRoute, httpOptions);
  }

  addOfferAndPrediction(offer, id_field) {
    // TODO
    console.log(offer);
    console.log(id_field);
  }

  updateOffer(offer) {
    let token = this._authentificationService.getTokenUser().value;
    let httpOptions = this.buildHttpOptions(token);

    let body = JSON.stringify({
        'title': offer.title,
        'content': offer.content
      }
    )
    return this.http.put(this.offersRoute + '/' + offer.id, body, httpOptions);
  }

  updatePredictionOfOffer(id_offer, id_field) {
    let token = this._authentificationService.getTokenUser().value;
    let httpOptions = this.buildHttpOptions(token);

    let body = JSON.stringify({
        'id_offer': id_offer,
        'id_field': id_field
      }
    )
    return this.http.post(this.offersRoute + '/update_prediction_by_id_offer', body, httpOptions);
  }


  getOfferForConnectedClient() {
    let token = this._authentificationService.getTokenUser().value;
    let id = this._authentificationService.getConnectedUser().value.id;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization' : 'Bearer ' + token
      })
    };

    return this.http.get(this.globalLink + '/searchOffersByUser/' + id, httpOptions);
  }

  deleteOffer(id: number) {
    let token = this._authentificationService.getTokenUser().value;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization' : 'Bearer ' + token
      })
    };

    return this.http.delete(this.offersRoute + '/' + id, httpOptions);
  }

}
