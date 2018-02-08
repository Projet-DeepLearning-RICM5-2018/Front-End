import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.css']
})
export class MyOffersComponent implements OnInit {
  TestFormations = [
    { id: 1, name: 'Cras justo odio' },
    { id: 2, name: 'Dapibus ac facilisis in' },
    { id: 3, name: 'Morbi leo risus' },
  ];

  TestRes = [
    { id: 1, name: 'Cras justo odio' },
    { id: 2, name: 'Dapibus ac facilisis in' },
    { id: 3, name: 'Morbi leo risus' },
  ];

  resultats = [];
  formations = [];
  displayResults=false;

  searchFormation(): void {
    this.displayResults = true;
    this.formations= this.TestFormations;
  }

  constructor() { }

  ngOnInit() {
    this.resultats = this.TestRes;
  }

}
