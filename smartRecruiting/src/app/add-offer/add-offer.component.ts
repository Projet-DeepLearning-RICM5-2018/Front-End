import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.css']
})
export class AddOfferComponent implements OnInit {

  TestFormations = [
    { id: 1, name: 'Cras justo odio' },
    { id: 2, name: 'Dapibus ac facilisis in' },
    { id: 3, name: 'Morbi leo risus' },
  ];
  formations = [];
  displayResults=false;
  
  searchFormation(): void {
    this.displayResults = true;
    this.formations= this.TestFormations;
  }



  constructor() {
  }

  ngOnInit() {
  }

}
