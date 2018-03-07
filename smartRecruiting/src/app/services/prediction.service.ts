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

const oneField = {id: 1,
  name: 'Cras justo odio',
  description: 'Iam virtutem ex consuetudine vitae sermonisque nostri interpretemur nec eam, ut quidam docti, verborum magnificentia metiamur virosque bonos eos, qui habentur, numeremus, Paulos, Catones, Galos, Scipiones, Philos; his communis vita contenta est; eos autem omittamus, qui omnino nusquam reperiuntur.',
  descriptor: '',
  website: '',
  contacts: [ { id: 1, name:"Otto",surname:"Mark",role:"Chef",email:"mail@mail.fr",phone:"000" },
              { id: 1, name:"Throton",surname:"Jacob",role:"Secretaire",email:"mail@mail.fr",phone:"000" },
              { id: 1, name:"theBird",surname:"Larry",role:"Directeur",email:"mail@mail.fr",phone:"000" },
            ]
 }

@Injectable()
export class PredictionService {

  private globalLink = URL_API;
  private currentOffer = new BehaviorSubject<Offer>({id: 1,title: "",content: "",descriptor: "",});
  private displayResults = new BehaviorSubject<boolean>(false);
  private listeFieldFound = new BehaviorSubject<Field[]>([]);
  private uplodedFile = new BehaviorSubject<File>(null);

  currentOffer$ = this.currentOffer.asObservable();
  displayResults$ = this.displayResults.asObservable();
  listeFieldFound$ = this.listeFieldFound.asObservable();
  uplodedFile$ = this.uplodedFile.asObservable();

  constructor(private http: HttpClient,
  private _authentificationservice : AuthentificationService) {}

  //Getter - setter
  getCurrentOffer(): BehaviorSubject<Offer>{return this.currentOffer;}
  setCurrentOffer(newoffer:Offer): void {this.currentOffer.next(newoffer);}
  setCurrentOfferContent(content:string): void {
    var newoffer = this.currentOffer.getValue();
    newoffer.content = content;
    this.currentOffer.next(newoffer);
  }

  getCurrentFile(): BehaviorSubject<File>{return this.uplodedFile;}
  setCurrentFile(newFile:File): void {this.uplodedFile.next(newFile);}

  getDisplayResults(): BehaviorSubject<boolean>{return this.displayResults;}
  setDisplayResults(newValue:boolean): void {this.displayResults.next(newValue);}

  getListeFieldFound(): BehaviorSubject<Field[]>{return this.listeFieldFound;}
  setListeFieldFound(fields){this.listeFieldFound.next(fields);}

  createHeader(){
    return {
      headers: new HttpHeaders({
        'Authorization' : 'Bearer '+this._authentificationservice.getTokenUser().value
      })
    };
  }

  //Save offer
  getPrediction(title, strOffer, fileOffer){
    var content = ''
    if(fileOffer!=undefined){
      console.log("Extraire les données du fichier avant de sauvegarder dans la BDD")
      this.setCurrentFile(fileOffer);
    }
    else{
      console.log("Save str BDD")
      this.setCurrentOfferContent(strOffer);
      content = strOffer;
    }
    console.log("Launch Prediction")
    let user = this._authentificationservice.getConnectedUser().value;
    let body = JSON.stringify({
        'title': title,
        'content': content,
        'descriptor' : "",
        'id_user': user.id,
      });
    return this.http.post(this.globalLink+'/generatePrediction',body,this.createHeader())
  }

  //Save offer and a prediction
  saveAnOfferAndAPrediction(title, content, idField){
  let user = this._authentificationservice.getConnectedUser().value;
  let body = JSON.stringify({
      'title': title,
      'content': content,
      'id_user': user.id,
      'id_field': idField,
      'inbase' : false
    });

    this.http.post(this.globalLink+'/offers_link',body,this.createHeader())
  }

}
