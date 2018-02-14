import { Component, OnInit } from '@angular/core';
import {Field} from '../../shared/field';
import {Prediction} from '../../shared/prediction';

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.css']
})
export class MyOffersComponent implements OnInit {

  public predictions: Prediction[];
  public fields: Field[];
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
      inbase: false
    }, {
      id: 2,
      offer: {
        id: 2,
        title: 'Recherche licorne',
        content: 'Je recherche une licorne magique en bonne forme pour m\'emmener au pays magique',
        descriptor: null
      },
      fields: [this.GGC, this.RICM],
      mark: null,
      inbase: false
    },
  ];

  constructor() { }

  ngOnInit() {
    this.predictions = this.TestData;
    this.fields = this.TestFields;
    this.modifyingPrediction = false;
    this.selectedField = '';
  }

  selectPrediction(p): void {
    this.selectedPrediction = p;
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
