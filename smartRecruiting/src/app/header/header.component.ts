import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public connected : boolean;

  constructor() { }

  ngOnInit() {
    this.connected = false;
  }

  connect() {
    this.connected = true;
  }

  disconnect() {
    this.connected = false;
  }

}
