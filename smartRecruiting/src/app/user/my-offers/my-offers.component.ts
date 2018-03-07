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

  private RICM: Field = {
    id: 1,
    name: 'RICM',
    description: 'Fausse filière',
    website: 'polytech-grenoble.fr',
    descriptor: null,
    contacts: null
  };
  private PRI: Field = {
    id: 2,
    name: 'PRI',
    description: 'Prévention des risques',
    website: 'polytech-grenoble.fr',
    descriptor: null,
    contacts: null
  };
  private GGC: Field = {
    id: 3,
    name: 'GGC',
    description: 'Géotechniques',
    website: 'polytech-grenoble.fr',
    descriptor: null,
    contacts: null
  };

  constructor(
    private _offerservice : OfferService,
    private _fieldservice : FieldService) { }

  ngOnInit() {
    var id = this._authentificationservice.getConnectedUser().value.id;
    var token = this._authentificationservice.getTokenUser().value;
    this._offerservice.getOfferForConnectedClient(id,token)
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
    var token = this._authentificationservice.getTokenUser().value;
    this.selectedPrediction = p;

    this._fieldservice.getAllFieldByOffer(this.selectedPrediction.id)
    .subscribe(
      data => {
        console.log(data)
        this.fields = data;
      },
      error => {console.log(error);this.fields = [];}
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

}
