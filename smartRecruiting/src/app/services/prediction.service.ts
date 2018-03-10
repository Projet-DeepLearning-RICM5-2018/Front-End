import { Injectable,EventEmitter  } from '@angular/core';
import { Offer } from '../shared/offer';
import { Field } from '../shared/field';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap, retry } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { URL_API } from '../shared/constants'
import { AuthentificationService } from './authentification.service';


@Injectable()
export class PredictionService {

  private globalLink = URL_API;

  private currentOffer = new BehaviorSubject<Offer>({id: 1,title: "",content: "",descriptor: "",});
  private currentOfferIsSaved = new BehaviorSubject<boolean>(false);
  private displayResults = new BehaviorSubject<boolean>(false);
  private listeFieldFound = new BehaviorSubject<Field[]>([]);
  private uplodedFile = new BehaviorSubject<File>(undefined);

  currentOffer$ = this.currentOffer.asObservable();
  displayResults$ = this.displayResults.asObservable();
  listeFieldFound$ = this.listeFieldFound.asObservable();
  uplodedFile$ = this.uplodedFile.asObservable();
  currentOfferIsSaved$ = this.currentOfferIsSaved.asObservable();

  constructor(
    private http: HttpClient,
    private _authentificationservice : AuthentificationService
  ) {}

  //Getter - setter
  getCurrentOffer(): BehaviorSubject<Offer>{return this.currentOffer;}
  setCurrentOffer(newoffer:Offer): void {this.currentOffer.next(newoffer);}

  getCurrentFile(): BehaviorSubject<File>{return this.uplodedFile;}
  setCurrentFile(newFile:File): void {this.uplodedFile.next(newFile);}

  getDisplayResults(): BehaviorSubject<boolean>{return this.displayResults;}
  setDisplayResults(newValue:boolean): void {this.displayResults.next(newValue);}

  getListeFieldFound(): BehaviorSubject<Field[]>{return this.listeFieldFound;}
  setListeFieldFound(fields){this.listeFieldFound.next(fields);}

  getCurrentOfferIsSaved(): BehaviorSubject<boolean>{return this.currentOfferIsSaved;}
  setCurrentOfferIsSaved(b : boolean){this.currentOfferIsSaved.next(b);}

  //Save offer
  getPrediction(title, strOffer, fileOffer){
    var content = ''
    if(fileOffer!=undefined){
      this.setCurrentFile(fileOffer);
    }
    else{
      this.setCurrentOffer({id: 0,title: title,content: strOffer,descriptor: "",});
      content = strOffer;
    }
    let body = JSON.stringify({
        'title': title,
        'content': content,
      });
    return this.http.post(this.globalLink+'/generatePrediction',body)
  }

  //Save offer and a prediction
  saveAnOfferAndAPrediction(title, content, idField){
    if(this.currentOfferIsSaved.value){
      console.log("SAVE!")
      let user = this._authentificationservice.getConnectedUser().value;
      let body = JSON.stringify({
          'title': title,
          'content': content,
          'id_user': user.id,
          'id_field': idField,
          'inbase' : false
        });
        console.log(user);
        console.log(body);
        return this.http.post(this.globalLink + '/offers/link', body, this.createHeader())
    }
    return undefined
  }

  createHeader(){
    return {
      headers: new HttpHeaders({
        'Authorization' : 'Bearer ' + this._authentificationservice.getTokenUser().value
      })
    };
  }

  reInitValue(){
    this.setCurrentOffer({id: 1,title: "",content: "",descriptor: "",});
    this.setCurrentFile(undefined);
    this.setDisplayResults(false);
    this.setListeFieldFound([]);
    this.setCurrentOfferIsSaved(false);
  }

}
