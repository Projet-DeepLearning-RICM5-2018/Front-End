import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-page',
  templateUrl: './no-page.component.html',
  styleUrls: ['./no-page.component.css']
})
export class NoPageComponent implements OnInit {
  listImage = ["cat-angry.jpg","cat.jpeg","kitten.jpg","panda.jpg","simpson.jpg"];
  indice = Math.floor(Math.random() * 5);
  image = "assets/404/" + this.listImage[this.indice];
  constructor() { }

  ngOnInit() {
  }

}
