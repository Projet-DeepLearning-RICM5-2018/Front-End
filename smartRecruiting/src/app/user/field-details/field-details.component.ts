import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Field } from '../../shared/field';
import { FoundFieldService } from '../../services/found-field.service';
import {Location} from '@angular/common';
import { FieldService } from '../../services/field.service';

@Component({
  selector: 'app-field-details',
  templateUrl: './field-details.component.html',
  styleUrls: ['./field-details.component.css']
})
export class FieldDetailsComponent implements OnInit {

  currentField : any;
  index: number;

  constructor(public route: ActivatedRoute,
    private _fieldservice : FieldService,
    private location: Location) { }

  goBack() {
    this.location.back();
  }


  ngOnInit() {
    /**TODO requete HTTP*/
    this.route.params.subscribe(params => {this.index = +params['id'];});
    this.currentField = this._fieldservice.getField(this.index);

  }

}
