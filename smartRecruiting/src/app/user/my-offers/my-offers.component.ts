import { Component, OnInit } from '@angular/core';
import {Field} from '../../shared/field';
import {Prediction} from '../../shared/prediction';
import { OfferService } from '../../services/offer.service';
import { FieldService } from '../../services/field.service';
import { UserOfferService } from '../../services/user-offer.service';
import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.css']
})
export class MyOffersComponent implements OnInit {

  public offers: any;
  public fields: any;
  public selectedOffer: any;
  public selectedField: string;
  public modifyingPrediction: boolean;
  public displayResults: boolean;

  private modalDanger: NgbModalRef;

  constructor(
    private modalService: NgbModal,
    private _offerService: OfferService,
    private _fieldService: FieldService,
    private _userofferService: UserOfferService
  ) { }

  ngOnInit() {
    //subscribe and get saved data
    this.selectedOffer = this._userofferService.getSelectedOffer()?this._userofferService.getSelectedOffer():undefined;
    this.selectedField = this._userofferService.getAssociatedField()?this._userofferService.getAssociatedField():undefined;
    this.displayResults = this.selectedOffer?true:false;


    let list = this._userofferService.getCurrentOffersList()
    if(list){
      this.offers = list;
    }
    else{
      this._offerService.getOfferForConnectedClient().subscribe(
          data => {
            this.offers = data;
            this._userofferService.setCurrentOffersList(this.offers);
          },
          error => {}
      );
    }
    this.modifyingPrediction = false;
    this.selectedField = '';
  }

  //Select an offer and get the associated field
  selectOffer(o): void {
    //fields
    this.selectedOffer = o;
    this._userofferService.setSelectedOffer(this.selectedOffer);
    this.displayResults = true;
    this._fieldService.getFieldByOffer(this.selectedOffer.id)
    .subscribe(
      data => {
        this.fields = data;
        this._userofferService.setAssociatedField(this.fields);
      },
      error => {console.log(error); this.fields = [];}
    );
  }

  //Allow user to modify the offer/field
  modifyPrediction() {
    this.modifyingPrediction = true;
  }

  //Add prediction in learning base
  validatePrediction() {
    this.selectedOffer.inbase = true;
  }


  addField() {
    function isSelectedField(f) {
      return f.name === this.fields;
    }

    if (this.fields !== '') {
      const field = this.fields.find(isSelectedField, this);
      if (!this.selectedOffer.fields.includes(field)) {
        this.selectedOffer.fields.push(field);
      }
    }
  }

  removeField(f) {
    this.selectedOffer.fields = this.selectedOffer.fields.filter(obj => obj !== f);
  }

  save() {
    this.fields = ';'
    this.modifyingPrediction = false;
  }

  clear() {
    this.fields = '';
  }

  //
  deleteOffer(offer){
    if (this.selectedOffer && offer.id === this.selectedOffer.id){
      this._userofferService.setSelectedOffer(undefined);
      this._userofferService.setAssociatedField([]);
      this.selectedOffer = undefined;
      this.fields = undefined;
    }
    console.log(offer);
    this._offerService.deleteOffer(offer.id).subscribe(
      data => {
        var index = this.offers.findIndex(it => it.id === offer.id);
        this.offers.splice(index, 1);
      },
      error => {}
    );
  }

  openDangerPopUp(danger,offer){
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

}
