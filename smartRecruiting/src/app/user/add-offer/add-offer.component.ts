import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CurrentOfferService } from '../../services/current-offer.service';
import { Offer } from '../../shared/offer';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.css']
})
export class AddOfferComponent implements OnInit {

  offerObject : Offer;
  formations = [];
  displayResults=false;
  offerContent = "";
  uploadFile : File;
  uploadFileName : string;

  searchFormation(): void {
    /*TODO search formation modification objet*/
    if(this.uploadFile!=undefined || this.offerContent!=""){
      this.currentofferservice.setCurrentOfferContent(this.offerContent);
      this.currentofferservice.setCurrentFile(this.uploadFile);
      this.currentofferservice.setDisplayResults(true);
      this.router.navigate(['/offre/'+this.offerObject.id]);
    }

  }

  reload():void{
    this.offerContent = "";
    this.currentofferservice.setCurrentOfferContent("");
    this.currentofferservice.setCurrentFile(null);
    this.currentofferservice.setDisplayResults(false);
    this.router.navigate(['/offre/']);
  }

  getCurrentOffer(): void {
    this.currentofferservice.currentOffer$.subscribe(item => this.offerObject = item)
    this.currentofferservice.displayResults$.subscribe(item => this.displayResults = item)
    this.currentofferservice.listeFieldFound$.subscribe(item => this.formations = item)
    this.currentofferservice.uplodedFile$.subscribe(item => this.uploadFile = item)
    this.offerContent = this.offerObject.content;
  }

  constructor(public router: Router, private currentofferservice: CurrentOfferService) {
  }

  ngOnInit() {
    this.getCurrentOffer();
  }

  onFileChange(event){
    var files = event.srcElement.files;
    if(files.length>0){
      this.uploadFile = files[0];
    }
  }

}
