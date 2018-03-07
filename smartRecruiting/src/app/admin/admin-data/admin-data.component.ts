import { Component, OnInit } from '@angular/core';
import {Prediction} from '../../shared/prediction';
import {Offer} from '../../shared/offer';
import {Field} from '../../shared/field';
import {OfferService} from '../../services/offer.service';
import {FieldService} from '../../services/field.service';

@Component({
  selector: 'app-admin-data',
  templateUrl: './admin-data.component.html',
  styleUrls: ['./admin-data.component.css']
})
export class AdminDataComponent implements OnInit {

  public offers: any;
  public selectedOffer: any;
  public fields_of_offer: any;
  public all_fields: any;
  public selectedfield: string;

  public editingField: boolean;
  public modifiedField: boolean;
  private isnew: boolean;

  constructor(
    private _offerService: OfferService,
    private _fieldService: FieldService
  ) { }

  ngOnInit() {
    this._offerService.getAllOffers().subscribe(offers => this.offers = offers);
    this._fieldService.getAllFields().subscribe(data => this.all_fields = data);
  }

  addData() {
    this.clear();
    this.selectedOffer = new Offer();
    this.fields_of_offer = [new Field()];
    this.editingField = true;
    this.isnew = true;
  }

  selectOffer(offer) {
    this.clear();
    this.selectedOffer = offer;
    this._fieldService.getFieldByOffer(offer.id).subscribe(
      returned_offers => this.fields_of_offer = returned_offers);
  }

  deleteData() {
    this.offers = this.offers.filter(obj => obj !== this.selectedOffer);
    this.clear();
  }

  validateField() {
    function isSelectedField(f) {
      return f.name === this.selectedfield;
    }

    if (this.selectedfield !== '') {
      const field = this.all_fields.find(isSelectedField, this);
      this._fieldService.getField(field.id).subscribe(
        f => this.fields_of_offer = [f]
      );
    }
    this.editingField = false;
    this.modifiedField = true;
    this.selectedfield = '';
  }

  editField() {
    this.editingField = true;
  }

  save() {
    if (this.isnew) {
      // Creates the offer and the associated prediction. Returns ths id of the created offer.
      this._offerService.addOfferAndPrediction(this.selectedOffer, this.fields_of_offer[0].id);
        // .subscribe(id => this.selectedOffer.id = id);
      this.offers.push(this.selectedOffer);
    } else {
      if (this.modifiedField) { // If the field changed
        // Update it
        this._offerService.updatePredictionOfOffer(this.selectedOffer.id, this.fields_of_offer[0].id).subscribe(
          data => console.log(data)
        );
      }
      // Update the offer's text and title
      this._offerService.updateOffer(this.selectedOffer).subscribe(
        data => console.log(data)
      );
    }
    this.clear();
  }

  clear() {
    this.selectedOffer = null;
    this.fields_of_offer = null;
    this.isnew = false;
    this.selectedfield = '';
    this.editingField = false;
    this.modifiedField = false;
  }

}
