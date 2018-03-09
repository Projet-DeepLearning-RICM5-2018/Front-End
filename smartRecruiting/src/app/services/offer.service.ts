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

  createHeader() {
    return {
      headers: new HttpHeaders({
        'Authorization' : 'Bearer ' + this._authentificationService.getTokenUser().value
      })
    };
  }

  getOffersPage(page_number) {
    let body = JSON.stringify({
        'nb_offre': 25,
        'num_page': page_number
      }
    );
    return this.http.post(this.offersRoute + '/page', body, this.createHeader());
  }


  getAllOffers() {
    return this.http.get(this.offersRoute, this.createHeader());
  }

  addOfferAndPrediction(offer, id_field) {
    let body = JSON.stringify({
      'title' : offer.title,
      'content' : offer.content,
      'id_user' : this._authentificationService.getConnectedUser().value.id,
      'id_field' : id_field,
      'inbase' : true }
    )
    return this.http.post(this.offersRoute + '/link', body, this.createHeader());
  }

  updateOffer(offer) {
    let body = JSON.stringify({
        'title': offer.title,
        'content': offer.content
      }
    );
    return this.http.put(this.offersRoute + '/' + offer.id, body, this.createHeader());
  }

  updatePredictionOfOffer(id_offer, id_field) {
    let body = JSON.stringify({
        'id_offer': id_offer,
        'id_field': id_field
      }
    );
    return this.http.post(this.globalLink + '/update_prediction_by_id_offer', body, this.createHeader());
  }

  putOfferInBase(id_offer) {
    let body = JSON.stringify({
        'id_offer': id_offer,
        'in_base': 1
      }
    );
    return this.http.post(this.globalLink + '/update_prediction_by_id_offer', body, this.createHeader());
  }

  getOfferForConnectedClient() {
    let id = this._authentificationService.getConnectedUser().value.id;
    return this.http.get(this.globalLink + '/searchOffersByUser/' + id, this.createHeader());
  }

  deleteOffer(id: number) {
    return this.http.delete(this.offersRoute + '/' + id, this.createHeader());
  }

}
