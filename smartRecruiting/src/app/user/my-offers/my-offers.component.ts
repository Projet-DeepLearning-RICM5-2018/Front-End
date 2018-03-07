import { Component, OnInit } from '@angular/core';
import {Field} from '../../shared/field';
import {Prediction} from '../../shared/prediction';
import { OfferService } from '../../services/offer.service';
import { FieldService } from '../../services/field.service';

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.css']
})
export class MyOffersComponent implements OnInit {

  public predictions: any;
  public fields: any;
  public selectedPrediction: Prediction ;
  public selectedField: string;
  public modifyingPrediction: boolean;

  constructor(
    private _offerservice: OfferService,
    private _fieldservice: FieldService
  ) { }

  ngOnInit() {

    this._offerservice.getOfferForConnectedClient()
    .subscribe(
      data => {
        this.predictions = data;
      },
      error => {}
    );
    this.modifyingPrediction = false;
    this.selectedField = '';
  }

  selectPrediction(p): void {
    //fields
    this.selectedPrediction = p;
    this._fieldservice.getFieldByOffer(this.selectedPrediction.id)
    .subscribe(
      data => {
        this.fields = data;
      },
      error => {console.log(error); this.fields = [];}
    );
  }

  modifyPrediction() {
    this.modifyingPrediction = true;
  }

  validatePrediction() {
    this.selectedPrediction.inbase = true;
  }

  addField() {

    function isSelectedField(f) {
      return f.name === this.selectedField;
    }

    if (this.selectedField !== '') {
      const field = this.fields.find(isSelectedField, this);
      if (!this.selectedPrediction.fields.includes(field)) {
        this.selectedPrediction.fields.push(field);
      }
    }
  }

  removeField(f) {
    this.selectedPrediction.fields = this.selectedPrediction.fields.filter(obj => obj !== f);
  }

  save() {
    this.selectedField = ';'
    this.modifyingPrediction = false;
  }

  clear() {
    this.selectedField = '';
  }

  deleteOffer(offer){
    if (this.selectedPrediction && offer.id === this.selectedPrediction.id){
      this.fields = [];
      this.selectedPrediction = undefined;
    }

    this._offerservice.deleteOffer(offer.id).subscribe(
      data => {
        var index = this.predictions.findIndex(it => it.id === offer.id);
        this.predictions.splice(index, 1);
      },
      error => {}
    );
  }

}
