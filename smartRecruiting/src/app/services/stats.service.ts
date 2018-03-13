import { Injectable } from '@angular/core';
import {URL_API} from '../shared/constants';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthentificationService} from './authentification.service';

@Injectable()
export class StatsService {

  private globalLink = URL_API;

  constructor(
    private http: HttpClient,
    private _authentificationService: AuthentificationService
  ) { }

  private createHeader() {
    return {
      headers: new HttpHeaders({
        'Authorization' : 'Bearer ' + this._authentificationService.getTokenUser().value
      })
    };
  }

  getAccuracy() {
    return this.http.get(this.globalLink + '/accuracy', this.createHeader());
  }

  getTodayPrediction() {
    const utc = new Date().toJSON().slice(0,10).replace(/-/g, '-');
    console.log(utc);
    const body = JSON.stringify({
      begin_date: utc,
      end_date: utc,
    });
    return this.http.post(this.globalLink + '/nbPrediction', body, this.createHeader());
  }

}
