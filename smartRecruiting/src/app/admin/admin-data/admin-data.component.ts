import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-data',
  templateUrl: './admin-data.component.html',
  styleUrls: ['./admin-data.component.css']
})
export class AdminDataComponent implements OnInit {

  public data;

  constructor() { }

  ngOnInit() {
    this.data=null;
  }

  addData() {
  }

}
