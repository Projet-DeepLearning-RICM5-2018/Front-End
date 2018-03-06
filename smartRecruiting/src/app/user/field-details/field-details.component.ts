import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Field } from '../../shared/field';
import { FoundFieldService } from '../../services/found-field.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-field-details',
  templateUrl: './field-details.component.html',
  styleUrls: ['./field-details.component.css']
})
export class FieldDetailsComponent implements OnInit {

  currentField = new Field();
  index: number;

  constructor(public route: ActivatedRoute,
    private foundfieldservice: FoundFieldService,
    private location: Location) { }

  goBack() {
    this.location.back();
  }


  ngOnInit() {
    /**TODO requete HTTP*/
    this.route.params.subscribe(params => {this.index = +params['id'];});
    this.currentField = this.foundfieldservice.getFieldFound(this.index);

  }

}
