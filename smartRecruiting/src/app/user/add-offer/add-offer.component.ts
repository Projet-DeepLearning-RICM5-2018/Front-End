import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PredictionService } from '../../services/prediction.service';
import { AuthentificationService } from '../../services/authentification.service';
import { Offer } from '../../shared/offer';
import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.css']
})
export class AddOfferComponent implements OnInit {

  public formations = [];

  //For display
  public displayResults = false;
  public isConnected : boolean;

  //Form
  public offerContent = "";
  public offerTitle = "";
  public uploadFile : File;
  public uploadFileName : string;

  private modalWarning: NgbModalRef;

  constructor(
    public router: Router,
    private _predictionservice: PredictionService,
    private _authentificationservice : AuthentificationService,
    private modalService: NgbModal,
  ) {}

  ngOnInit() {
    this.linkFieldWithService();
    this.initListenerUserConnexion();
  }

  //verify if the field or complete
  isValid(){
    return ((this.uploadFile!=undefined || this.offerContent!="") && this.offerTitle!='')
  }

  getPrediction(): void {
    if((this.uploadFile!=undefined || this.offerContent!="") && this.offerTitle!=''){//if there is a pdf or string offer
      var request = this._predictionservice.getPrediction(this.offerTitle,this.offerContent, this.uploadFile)
      .subscribe(
        data => {
          console.log(data);
          this._predictionservice.setListeFieldFound([data]);
          this._predictionservice.setDisplayResults(true);
          if(this.isConnected){
            console.log("Save because connect");
            this.savePrediction();
          }
        },
        error => {}
      );
    }
  }

  //Clear the differrent field
  reload():void{
    this._predictionservice.reInitValue();
  }

  //Init the different field
  linkFieldWithService(): void {
    this._predictionservice.currentOffer$.subscribe(item =>{
      this.offerContent = item.content;
      this.offerTitle = item.title;
    });
    this._predictionservice.displayResults$.subscribe(item => this.displayResults = item)
    this._predictionservice.listeFieldFound$.subscribe(item => {this.formations = item})
    this._predictionservice.uplodedFile$.subscribe(item => this.uploadFile = item)
  }

  //Subscribe to the connected boolean, if user connects after lauch prediction the prediction is saved in the BDD
  initListenerUserConnexion(){
    this._authentificationservice.isConnected$.subscribe(item =>{
      this.isConnected = item
      console.log("Connecté : " + this.isConnected)
      let isResult = (this.formations.length!=0)
      console.log("Result : " + isResult)
      let isResultSaved = (this._predictionservice.getCurrentOfferIsSaved().value)
      console.log("Dejà save? : " + isResultSaved)
      if(item && isResult && !isResultSaved){
        console.log("Save")
        this.savePrediction();
      }
      else{console.log("Don't save")}
    });
  }

  savePrediction(){
    this._predictionservice.setCurrentOfferIsSaved(true)
    this._predictionservice.saveAnOfferAndAPrediction(this.offerTitle,this.offerContent,this.formations[0].id)
      .subscribe(data => {console.log("Saved")}, error =>{console.log("retry");console.log(error);});
  }

  //Open the connexion modal
  open(warning) {
    this.modalWarning = this.modalService.open(warning);
    this.modalWarning.result.then(
      (result) => {console.log("close");},
      (reason) => {console.log("dissmiss");});
  }

  //Load File
  onFileChange(event){
    var files = event.srcElement.files;
    if(files.length>0){this.uploadFile = files[0];}
  }

}
