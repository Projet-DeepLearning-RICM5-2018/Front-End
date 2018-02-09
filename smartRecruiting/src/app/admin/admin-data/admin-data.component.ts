import { Component, OnInit } from '@angular/core';
import {Prediction} from '../../shared/prediction';
import {Offer} from '../../shared/offer';
import {Field} from '../../shared/field';

@Component({
  selector: 'app-admin-data',
  templateUrl: './admin-data.component.html',
  styleUrls: ['./admin-data.component.css']
})
export class AdminDataComponent implements OnInit {

  public data: Prediction[];
  public selected: Prediction;
  public fields: Field[];
  public selectedfield: Field;

  private isnew: boolean;
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

  private TestFields = [this.RICM, this.PRI, this.GGC];

  private TestData = [
    {
      id: 1,
      offer: {
        id: 1,
        title: 'Offre 12',
        content: 'Bonjour madame la baronne. Nous recherchons une personne capable de faire le ménage.',
        descriptor: null
      },
      fields: [this.PRI, this.GGC],
      mark: null,
      inbase: true
    },
  ];

  constructor() { }

  ngOnInit() {
    this.data = this.TestData;
    this.isnew = false;
    this.fields = this.TestFields;
  }

  addData() {
    this.selected = new Prediction();
    this.selected.inbase = true;
    this.selected.offer = new Offer();
    console.log(this.selected);
    this.isnew = true;
  }


  select(donnee) {
    this.selected = donnee;
  }

  addField() {
    console.log(this.selectedfield);
    this.selected.fields.push(this.selectedfield);
  }

  remove(f) {
    this.selected.fields = this.selected.fields.filter(obj => obj !== f);
  }

  save() {
    if (this.isnew) {
      this.data.push(this.selected);
      this.isnew = false;
    }
    this.selected = null;
  }

  clear() {
    this.selected = null;
  }

}
