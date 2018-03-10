import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FieldService } from '../../services/field.service';

@Component({
  selector: 'app-field-details',
  templateUrl: './field-details.component.html',
  styleUrls: ['./field-details.component.css']
})
export class FieldDetailsComponent implements OnInit {

  currentField : any;
  index: number;

  constructor(
    public route: ActivatedRoute,
    private _fieldservice: FieldService,
    private location: Location) { }

  goBack() {
    this.location.back();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {this.index = +params['id'];});
    this.currentField = this._fieldservice.getField(this.index)
    .subscribe(
      data => {
        this.currentField = data;
      },
      error => {console.log(error); this.currentField = {};}
    );

  }

}
