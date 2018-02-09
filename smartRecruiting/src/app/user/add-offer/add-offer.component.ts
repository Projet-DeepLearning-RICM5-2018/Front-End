import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CurrentOfferService } from '../../services/current-offer.service';
import { Offer } from '../../shared/offer';
import {Subscription} from 'rxjs/Subscription';

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

  offerObject : Offer;
  formations = [];
  displayResults=false;
  offerContent = "";
  subscription:Subscription;

  searchFormation(): void {
    this.displayResults = true;
    this.formations = this.TestFormations;
    this.offerObject.content = this.offerContent;
    this.currentofferservice.setCurrentOfferContent(this.offerContent);
    console.log(this.offerContent);
    console.log(this.offerObject);
    this.router.navigate(['/offre/'+this.offerObject.id]);
  }

  reload():void{
    this.offerContent = "";
    this.displayResults = false;
  }

  getCurrentOffer(): void {
    this.subscription = this.currentofferservice.currentOffer$.subscribe(item => this.offerObject = item)
    this.offerContent = this.offerObject.content;
    console.log(this.offerObject);
    console.log(this.offerObject.content);
  }

  constructor(public router: Router, private currentofferservice: CurrentOfferService) {
  }

  ngOnInit() {
    this.getCurrentOffer();
  }

}
