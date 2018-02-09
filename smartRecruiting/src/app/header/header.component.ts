import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public connected : boolean;
  public admin : boolean;

  constructor() { }

  ngOnInit() {
    this.connected = false;
    this.admin = false;
  }

  connect() {
    this.connected = true;
    this.admin = true;
  }

  disconnect() {
    this.connected = false;
    this.admin = false;
  }

}
