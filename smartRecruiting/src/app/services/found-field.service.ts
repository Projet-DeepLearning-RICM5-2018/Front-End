import { Injectable } from '@angular/core';
import { Field } from '../shared/field';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { FIELDS } from '../shared/mock-data';

@Injectable()
export class FoundFieldService {

  private listeFieldFound = new BehaviorSubject<Field[]>(FIELDS);

  constructor() { }

  getFieldFound(index : number): Field{
    var fields = this.listeFieldFound.getValue();
    return fields.find(function(element) {return element.id == index;});
  }

}
