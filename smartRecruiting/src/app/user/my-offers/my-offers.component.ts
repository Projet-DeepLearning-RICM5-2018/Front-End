import { Component, OnInit } from '@angular/core';
import {Field} from '../../shared/field';
import {Prediction} from '../../shared/prediction';
import { OfferService } from '../../services/offer.service';
import { FieldService } from '../../services/field.service';
import { UserOfferService } from '../../services/user-offer.service';
import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {AuthentificationService} from '../../services/authentification.service';

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.css']
})
export class MyOffersComponent implements OnInit {

  public offers: any;
  public fields: any;
  public allFields: any;
  public selectedOffer: any;
  public selectedField: string;
  public modifyingPrediction: boolean;
  public displayResults: boolean;

  private modalDanger: NgbModalRef;
  private modalWarning: NgbModalRef;

  public loadListIssue = false;
  public loadPredictionIssue = false;
  public modifPredictionIssue = false;
  public modifPredictionSuccess = false;
  public inBaseIssue = false;
  public eraseOfferIssue = false;
  public eraseOfferSuccess = false;

  constructor(
    private _authentificationService: AuthentificationService,
    private modalService: NgbModal,
    private _offerService: OfferService,
    private _fieldService: FieldService,
    private _userofferService: UserOfferService
  ) { }

  ngOnInit() {
    this.offers = undefined;
    this._authentificationService.connectedUser$.subscribe(item => {
      if(item==undefined){
          this._userofferService.setCurrentOffersList(undefined);
          this._userofferService.setSelectedOffer(undefined);
          this._userofferService.setAssociatedField(undefined);
      }else{
        this.fields = this._userofferService.getAssociatedField();
        this.selectedOffer = this._userofferService.getSelectedOffer();
      }
    });
    // subscribe and get saved data
    this.displayResults = !!this.selectedOffer;
    this._fieldService.getAllFieldsName().subscribe(
      res => {this.allFields = res;}
    )

    let list = this._userofferService.getCurrentOffersList();
    if (list) {this.offers = list;}
    else {
      this._offerService.getOfferForConnectedClient().subscribe(
          data => {
            this.reinitAlert();
            this.offers = data;
            this._userofferService.setCurrentOffersList(this.offers);
          },
          error => {
            this.reinitAlert();
            this.loadListIssue = true;
          }
      );
    }
    this.modifyingPrediction = false;
    this.selectedField = '';
  }

  reinitAlert(){
    this.loadListIssue = false;
    this.loadPredictionIssue = false;
    this.modifPredictionIssue = false;
    this.modifPredictionSuccess = false;
    this.inBaseIssue = false;
    this.eraseOfferIssue = false;
    this.eraseOfferSuccess = false;
  }

  // Select an offer and get the associated field
  selectOffer(o): void {
    this.clear();
    // fields
    this.selectedOffer = o;
    this._userofferService.setSelectedOffer(this.selectedOffer);
    this.displayResults = true;
    this._fieldService.getFieldByOffer(this.selectedOffer.id)
    .subscribe(
      data => {
        this.reinitAlert();
        this.selectedOffer.inbase = data[0].inbase;
        this.fields = data;
        this._userofferService.setAssociatedField(this.fields);
      },
      error => {
        this.reinitAlert();
        this.loadPredictionIssue = true;
        this.fields = [];
    });
  }

  // Allow user to modify the field
  modifyPrediction() {
    this.modifyingPrediction = true;
    this.selectedField = this.fields[0].name;
  }

  // Add prediction in learning base
  validatePrediction() {
  //modifPredictionIssue
    this._offerService.putOfferInBase(this.selectedOffer.id).subscribe(
      res => {
        this.reinitAlert();
        this.selectedOffer.inbase = true;
      },
      error => {
        this.reinitAlert();
        this.inBaseIssue = true;
      }
    );
  }

  saveField() {
    function isSelectedField(f) {
      return f.name === this.selectedField;
    }

    if (this.selectedField !== '') {
      const field = this.allFields.find(isSelectedField, this);
      this._offerService.updatePredictionOfOffer(this.selectedOffer.id, field.id).subscribe(
        res => {
          this.reinitAlert();
          this.modifPredictionSuccess = true;
          this.fields = [field];
          this._userofferService.setAssociatedField(this.fields);

        },
        error => {
          this.reinitAlert();
          this.modifPredictionIssue = true;
        }
      );
      this.modifyingPrediction = false;
    }
  }

  clear() {
    this.modifyingPrediction = false;
  }

  //
  deleteOffer(offer){
    if (this.selectedOffer && offer.id === this.selectedOffer.id){
      this._userofferService.setSelectedOffer(undefined);
      this._userofferService.setAssociatedField([]);
      this.selectedOffer = undefined;
      this.fields = undefined;
    }
    this._offerService.deleteOffer(offer.id).subscribe(
      data => {
        this.reinitAlert();
        this.eraseOfferSuccess = true;
        var index = this.offers.findIndex(it => it.id === offer.id);
        this.offers.splice(index, 1);
      },
      error => {
        this.reinitAlert();
        this.eraseOfferIssue = true

      }
    );
  }

  openDangerPopUp(danger, offer) {
    this.modalDanger = this.modalService.open(danger);
    this.modalDanger.result.then(
      (result) => {
        if(result=="yes"){
          this.deleteOffer(offer);
        }
      },
      (reason) => {console.log('');}
    );

  }

  openWarningPopUp(warning) {
    this.modalWarning = this.modalService.open(warning);
    this.modalWarning.result.then(
      (result) => {
        if(result=="yes"){
          this.validatePrediction()
        }
      },
      (reason) => {console.log('');}
    );

  }

}
