import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  test_route = 'http://localhost:5555/testCom';

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.http.get(this.test_route).subscribe(data => console.log(data));
  }

}
