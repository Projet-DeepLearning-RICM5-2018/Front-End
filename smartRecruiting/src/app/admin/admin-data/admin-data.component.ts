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

  public data: any;
  public selectedData: any;
  public all_fields: any;
  public selectedfield: string;
  public pagesNumbers: any;

  public editingField: boolean;
  public modifiedField: boolean;
  public editingData: boolean;
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
        this.data = res.data;
      }, error2 => {
        this.pagesNumbers = Array.from(new Array(5), (val, index) => index + 1);
      }
    );
    this._fieldService.getAllFieldsName().subscribe(data => this.all_fields = data);
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
        this.pagesNumbers = Array.from(new Array(res.nb_pages), (val, index) => index + 1);
        this.data = res.data;
        console.log(res);
      }, error2 => {
        this.pagesNumbers = Array.from(new Array(5), (val, index) => index + 1);
      }
    );
  }

  // Gestion de données //

  addData() {
    this.clear();
    this.selectedData = {'offer': new Offer(), 'field': new Field()}
    this.editingField = true;
    this.editingData = true;
    this.isnew = true;
  }

  selectData(data) {
    this.clear();
    this.selectedData = data;
    this._fieldService.getFieldByOffer(data.offer.id).subscribe(
      returned_offers => this.data.field = returned_offers[0]);

  }

  editData() {
    this.editingData = true;
  }

  deleteData() {
    let data = this.selectedData;
    this._offerService.deleteOffer(this.selectedData.offer.id).subscribe(
      res => {
        this.data = this.data.filter(obj => obj !== data);
        this.goToCurrentPage();
      }
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
        f => this.selectedData.field = f
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
      let data = this.selectedData;
      // Creates the offer and the associated prediction. Returns ths id of the created offer.
      this._offerService.addOfferAndPrediction(this.selectedData.offer, this.selectedData.field.id).subscribe(
        id => {
          data.offer.id = id;
          this.data.unshift(data);
          this.goToCurrentPage();
        }
      );
      this.isnew = false;
    } else {
      if (this.modifiedField) { // If the field changed
        // Update it
        this._offerService.updatePredictionOfOffer(this.selectedData.offer.id, this.selectedData.field.id).subscribe(
          data => console.log(data)
        );
      }
      // Update the offer's text and title
      this._offerService.updateOffer(this.selectedData.offer).subscribe(
        data => console.log(data)
      );
    }
    this.editingData = false;
  }

  clear() {
    this.selectedData = null;
    this.isnew = false;
    this.selectedfield = '';
    this.editingField = false;
    this.modifiedField = false;
    this.editingData = false;
  }

}
