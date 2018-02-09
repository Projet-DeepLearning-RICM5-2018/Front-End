import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-field-details',
  templateUrl: './field-details.component.html',
  styleUrls: ['./field-details.component.css']
})
export class FieldDetailsComponent implements OnInit {

  contacts = [
    { id: 1, nom:"Otto",prenom:"Mark",role:"Chef",mail:"mail@mail.fr" },
    { id: 1, nom:"Throton",prenom:"Jacob",role:"Secretaire",mail:"mail@mail.fr" },
    { id: 1, nom:"theBird",prenom:"Larry",role:"Directeur",mail:"mail@mail.fr" },
  ];

  constructor() { }

  ngOnInit() {
  }

}
