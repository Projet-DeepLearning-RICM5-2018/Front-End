import { Component, OnInit } from '@angular/core';
import {Field} from '../../shared/field';

@Component({
  selector: 'app-admin-field',
  templateUrl: './admin-field.component.html',
  styleUrls: ['./admin-field.component.css']
})
export class AdminFieldComponent implements OnInit {

  public fields: Field[];
  public selected: Field;

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

  constructor() { }

  ngOnInit() {
    this.fields = this.TestFields;
    this.selected = null;
  }

  select(f) {
    this.selected = f;
  }

  clear() {
    this.selected = null;
  }

}
