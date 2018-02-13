import { Injectable,EventEmitter  } from '@angular/core';
import { Offer } from '../shared/offer';
import { Field } from '../shared/field';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { FIELDS } from '../shared/mock-data';

@Injectable()
export class CurrentOfferService {
  private currentOffer = new BehaviorSubject<Offer>({id: 1,title: "",content: "",descriptor: "",});
  private displayResults = new BehaviorSubject<boolean>(false);
  private listeFieldFound = new BehaviorSubject<Field[]>(FIELDS);
  private uplodedFile = new BehaviorSubject<File>(null);

  currentOffer$ = this.currentOffer.asObservable();
  displayResults$ = this.displayResults.asObservable();
  listeFieldFound$ = this.listeFieldFound.asObservable();
  uplodedFile$ = this.uplodedFile.asObservable();

  constructor() {}

  getCurrentOffer(): BehaviorSubject<Offer>{
    return this.currentOffer;
  }

  setCurrentOffer(newoffer:Offer): void {
    this.currentOffer.next(newoffer);
  }

  getCurrentFile(): BehaviorSubject<File>{
    return this.uplodedFile;
  }

  setCurrentFile(newFile:File): void {
    this.uplodedFile.next(newFile);
  }

  setCurrentOfferContent(content:string): void {
    var newoffer = this.currentOffer.getValue();
    newoffer.content = content;
    this.currentOffer.next(newoffer);
  }

  getDisplayResults(): BehaviorSubject<boolean>{
    return this.displayResults;
  }

  setDisplayResults(newValue:boolean): void {
    this.displayResults.next(newValue);
  }

  getListeFieldFound(): BehaviorSubject<Field[]>{
    return this.listeFieldFound;
  }


}
