import { Component, OnInit } from '@angular/core';
import {Prediction} from '../../shared/prediction';
import {Offer} from '../../shared/offer';
import {Field} from '../../shared/field';
import {OfferService} from '../../services/offer.service';
import {FieldService} from '../../services/field.service';
import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-admin-data',
  templateUrl: './admin-data.component.html',
  styleUrls: ['./admin-data.component.css']
})
export class AdminDataComponent implements OnInit {

  public data: any;
  public selectedData: any;
  public all_fields: any;
  public selectedfield: string;
  public pagesNumbers: any;

  public searchField: string;
  public savedSearchField: string;

  public editingField: boolean;
  public modifiedField: boolean;
  public editingData: boolean;
  private isnew: boolean;

  private modalDanger: NgbModalRef;
  private pageNumber: number;

  form: FormGroup;

  constructor(
    private modalService: NgbModal,
    private _offerService: OfferService,
    private _fieldService: FieldService
  ) { }

  ngOnInit() {
    this.pageNumber = 1;
    this.savedSearchField = '';
    this.searchField = '';
    this._offerService.getOffersPage(this.pageNumber).subscribe(
      res => {
        console.log(res);
        this.pagesNumbers = Array.from(new Array(res['nb_pages']), (val, index) => index + 1);
        this.data = res['data'];
      }, error2 => {}
    );
    this._fieldService.getAllFieldsName().subscribe(data => this.all_fields = data);
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'content': new FormControl(null, Validators.required),
    });
  }

  get title() {return this.form.get('title'); }
  get content() {return this.form.get('content'); }

  // Gestion de pages et de recherche //

  previousPage() {
    if (this.pageNumber > 1) {
      this.pageNumber = this.pageNumber - 1;
      this.goToCurrentPage();
    }
  }

  nextPage() {
    if (this.pageNumber < this.pagesNumbers.length) {
      this.pageNumber = this.pageNumber + 1;
      this.goToCurrentPage();
    }
  }

  goToPage(nbPage) {
    this.pageNumber = nbPage;
    this.goToCurrentPage();
  }

  private goToCurrentPage() {
    function isSelectedField(f) {
      return f.name === this.savedSearchField;
    }
    const field = this.all_fields.find(isSelectedField, this);
    const id = field ? field.id : null;
    this._offerService.getOffersPageSearch(this.pageNumber, id).subscribe(
      res => {
        this.pagesNumbers = Array.from(new Array(res['nb_pages']), (val, index) => index + 1);
        this.data = res['data'];
        console.log(res);
      }, error2 => {
        this.pagesNumbers = Array.from(new Array(5), (val, index) => index + 1);
      }
    );
  }

  // Gestion de données //

  addData() {
    this.clear();
    this.selectedData = {'offer': new Offer(), 'field': new Field()}
    this.editingField = true;
    this.editingData = true;
    this.isnew = true;
  }

  selectData(data) {
    this.clear();
    this.selectedData = data;
    this._fieldService.getFieldByOffer(data.offer.id).subscribe(
      returned_offers => this.data.field = returned_offers[0]);

  }

  editData() {
    this.editingData = true;
  }

  deleteData() {
    let data = this.selectedData;
    this._offerService.deleteOffer(this.selectedData.offer.id).subscribe(
      res => {
        this.data = this.data.filter(obj => obj !== data);
        this.goToCurrentPage();
      }
    );
    this.clear();
  }

  validateField() {
    function isSelectedField(f) {
      return f.name === this.selectedfield;
    }

    if (this.selectedfield !== '') {
      const field = this.all_fields.find(isSelectedField, this);
      this._fieldService.getField(field.id).subscribe(
        f => this.selectedData.field = f
      );
    }
    this.editingField = false;
    this.modifiedField = true;
    this.selectedfield = '';
  }

  editField() {
    this.editingField = true;
    this.selectedfield = this.selectedData.field.name;
  }

  save() {
    if (this.editingField) {
      this.validateField();
    }
    if (this.isnew) {
      let data = this.selectedData;
      // Creates the offer and the associated prediction. Returns ths id of the created offer.
      this._offerService.addOfferAndPrediction(this.selectedData.offer, this.selectedData.field.id).subscribe(
        id => {
          data.offer.id = id;
          this.data.unshift(data);
          this.goToCurrentPage();
        }
      );
      this.isnew = false;
    } else {
      if (this.modifiedField) { // If the field changed
        // Update it
        this._offerService.updatePredictionOfOffer(this.selectedData.offer.id, this.selectedData.field.id).subscribe(
          data => {
            this.goToCurrentPage();
          }
        );
      }
      // Update the offer's text and title
      this._offerService.updateOffer(this.selectedData.offer).subscribe(
        data => {
        }
      );
    }
    this.editingData = false;
    this.editingField = false;
  }

  clear() {
    this.selectedData = null;
    this.isnew = false;
    this.selectedfield = '';
    this.editingField = false;
    this.modifiedField = false;
    this.editingData = false;
  }

  search() {
    this.pageNumber = 1;
    this.savedSearchField = this.searchField;
    this.goToCurrentPage();
  }

  cancelSearch() {
    this.pageNumber = 1;
    this.searchField = '';
    this.savedSearchField = '';
    this.goToCurrentPage();
  }

  openDangerPopUp(danger){
    this.modalDanger = this.modalService.open(danger);
    this.modalDanger.result.then(
      (result) => {
        if (result === 'yes' ) {
          this.deleteData();
        }
      },
      (reason) => {console.log(''); }
    );

  }

}
