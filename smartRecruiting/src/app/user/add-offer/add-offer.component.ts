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

  public offerObject : Offer;
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
    private modalService: NgbModal,) {
  }

  ngOnInit() {
    this.getCurrentOffer();
    this.listenerUserConnexion();
  }

  isValid(){
    return ((this.uploadFile!=undefined || this.offerContent!="") && this.offerTitle!='')
  }

  getPrediction(): void {
    if((this.uploadFile!=undefined || this.offerContent!="") && this.offerTitle!=''){//if there is a pdf or string offer
      var request = this._predictionservice.getPrediction(this.offerTitle,this.offerContent, this.uploadFile)
      .subscribe(
        data => {
          console.log(data);
          this._predictionservice.setListeFieldFound(data);
          this._predictionservice.setDisplayResults(true);
          this.router.navigate(['/offre/'+this.offerObject.id]);
        },
        error => {}
      );
    }
  }

  //Clear the differrent field
  reload():void{
    this.offerContent = "";
    this._predictionservice.setCurrentOfferContent("");
    this._predictionservice.setCurrentFile(null);
    this._predictionservice.setDisplayResults(false);
    this.router.navigate(['/offre/']);
  }

  //Init the different field
  getCurrentOffer(): void {
    this._predictionservice.currentOffer$.subscribe(item => this.offerObject = item)
    this._predictionservice.displayResults$.subscribe(item => this.displayResults = item)
    this._predictionservice.listeFieldFound$.subscribe(item => this.formations = item)
    this._predictionservice.uplodedFile$.subscribe(item => this.uploadFile = item)
    this.offerContent = this.offerObject.content;
  }

  //Subscribe to the connected boolean, if user connects after lauch prediction the prediction is saved in the BDD
  listenerUserConnexion(){
    this._authentificationservice.connectedUser$.subscribe(item =>{
      this.isConnected = (item!=undefined)
      if(this.isConnected && this.formations.length!=0){
        this._predictionservice.saveAnOfferAndAPrediction(this.offerContent,this.offerTitle,this.formations[0].id);
      }
      else{console.log("Don't save")}
    });
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
