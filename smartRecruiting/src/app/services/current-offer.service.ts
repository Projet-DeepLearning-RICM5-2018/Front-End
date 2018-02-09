import { Injectable,EventEmitter  } from '@angular/core';
import { Offer } from '../shared/offer';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class CurrentOfferService {

  private currentOffer = new BehaviorSubject<Offer>({
                                                      id: 1,
                                                      title: "",
                                                      content: "",
                                                      descriptor: "",
                                                    });
  currentOffer$ = this.currentOffer.asObservable();

  constructor() {}

  getCurrentOffer(): BehaviorSubject<Offer>{
    return this.currentOffer;
  }

  setCurrentOffer(newoffer:Offer): void {
    this.currentOffer.next(newoffer);
  }

  setCurrentOfferContent(content:string): void {
    var newoffer = this.currentOffer.getValue();
    newoffer.content = content;
    this.currentOffer.next(newoffer);
  }
}
