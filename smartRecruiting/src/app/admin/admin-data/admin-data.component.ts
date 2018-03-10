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
  public pagesNumbers: any;

  public editingData: boolean;
  public editingField: boolean;
  public modifiedField: boolean;
  private isnew: boolean;

  private pageNumber: number;

  constructor(
    private _offerService: OfferService,
    private _fieldService: FieldService
  ) { }

  ngOnInit() {
    this.pageNumber = 1;
    this._offerService.getOffersPage(this.pageNumber).subscribe(
      res => {
        console.log(res);
        this.pagesNumbers = Array.from(new Array(res.nb_pages), (val, index) => index + 1);
        console.log(this.pagesNumbers);
      }
    )
    this._offerService.getAllOffers().subscribe(
      offers => {
        this.offers = offers;
        this.offers.sort((a, b) => b.id - a.id);
      }
    );
    this._fieldService.getAllFields().subscribe(data => this.all_fields = data);
  }


  // Gestion de pages //

  previousPage() {
    if (this.pageNumber > 1) {
      this.pageNumber = this.pageNumber - 1;
      this.goToCurrentPage();
    }
  }

  nextPage() {
    if (this.pageNumber < this.pagesNumbers.length) {
      this.pageNumber = this.pageNumber + 1;
      this.goToCurrentPage();
    }
  }

  goToPage(nbPage) {
    this.pageNumber = nbPage;
    this.goToCurrentPage();
  }

  private goToCurrentPage() {
    console.log(this.pageNumber);
    this._offerService.getOffersPage(this.pageNumber).subscribe(
      res => {
        this.offers = res.data;
      }
    );
  }

  addData() {
    this.clear();
    this.selectedOffer = new Offer();
    this.fields_of_offer = [new Field()];
    this.editingData = true;
    this.editingField = true;
    this.isnew = true;
  }

  selectOffer(offer) {
    this.clear();
    this.selectedOffer = offer;
    this._fieldService.getFieldByOffer(offer.id).subscribe(
      returned_offers => this.fields_of_offer = returned_offers);
  }
  editData() {
    this.editingData = true;
  }

  deleteData() {
    let offer = this.selectedOffer;
    this._offerService.deleteOffer(this.selectedOffer.id).subscribe(
      this.offers = this.offers.filter(obj => obj !== offer)
    );
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
      let offer = this.selectedOffer;
      // Creates the offer and the associated prediction. Returns ths id of the created offer.
      this._offerService.addOfferAndPrediction(this.selectedOffer, this.fields_of_offer[0].id).subscribe(
        id => {
          offer.id = id;
          this.offers.unshift(offer);
        }
      );
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
    this.editingData = false;
    // this.clear();
  }

  clear() {
    this.selectedOffer = null;
    this.fields_of_offer = null;
    this.isnew = false;
    this.selectedfield = '';
    this.editingField = false;
    this.modifiedField = false;
    this.editingData = false;
  }

}
