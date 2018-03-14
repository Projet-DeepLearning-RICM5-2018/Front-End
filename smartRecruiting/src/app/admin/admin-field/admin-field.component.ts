import { Component, OnInit } from '@angular/core';
import {Field} from '../../shared/field';
import {Contact} from '../../shared/contact';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FieldService} from '../../services/field.service';
import {ContactService} from '../../services/contact.service';
import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-field',
  templateUrl: './admin-field.component.html',
  styleUrls: ['./admin-field.component.css']
})
export class AdminFieldComponent implements OnInit {

  public fields: any;
  public selectedField: Field;
  public currentContact: Contact;
  public showContact: boolean;

  private allFields: any;
  private isNewField: boolean;
  private isNewContact: boolean;

  // Booleens pour les alertes
  public fieldsLoadingError: boolean;
  public savingSuccess: boolean;
  public savingError: boolean;
  public contactSavingSuccess: boolean;
  public contactSavingError: boolean;
  public contactDeleteSuccess: boolean;
  public contactDeleteError: boolean;

  formField: FormGroup;
  formContact: FormGroup;

  private modalDanger: NgbModalRef;
  private message: string;

  constructor(
    private _modalService: NgbModal,
    private _fieldsService: FieldService,
    private _contactService: ContactService,
  ) { }


  initFields(fields) {
    this.allFields = fields;
    this.fields = Object.assign([], this.allFields);
  }

  ngOnInit() {
    this.fieldsLoadingError = false;
    this._fieldsService.getAllFields().subscribe(
      data => this.initFields(data),
      error2 => {
        this.fieldsLoadingError = true;
      }
    );
    this.selectedField = null;
    this.currentContact = null;
    this.showContact = false;
    this.isNewField = false;
    this.isNewContact = false;
    this.initForm();
  }

  initForm() {
    this.formField = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'website': new FormControl(null, Validators.required)
    });
    this.formContact = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'surname' : new FormControl(null, Validators.required),
      'role': new FormControl(null, Validators.required),
      'phone' : new FormControl(null, Validators.required),
      'email': new FormControl(null, Validators.email)
    });
  }

  filterFields(value) {
    if (!value) {
      this.fields = Object.assign([], this.allFields);
    } else {
      this.fields = Object.assign([], this.allFields).filter(
        item => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1
      );
    }
  }

  get name() {return this.formField.get('name'); }
  get description() {return this.formField.get('description'); }
  get website() {return this.formField.get('website'); }


  get cname() {return this.formContact.get('name'); }
  get surname() {return this.formContact.get('surname'); }
  get role() {return this.formContact.get('role'); }
  get phone() {return this.formContact.get('phone'); }
  get email() {return this.formContact.get('email'); }

  addField() {
    this.selectedField = new Field();
    this.selectedField.contacts = [];
    this.showContact = false;
    this.isNewField = true;
  }

  selectField(f) {
    this.clear();
    this.selectedField = f;
    this.showContact = (f.contacts && f.contacts.length > 0);
  }

  addContact() {
    this.clearContactAlerts();
    this.isNewContact = true;
    this.showContact = true;
    const newcontact = new Contact();
    if (!this.selectedField.contacts) {
      this.selectedField.contacts = [];
    }
    this.selectedField.contacts.push(newcontact);
    this.currentContact = newcontact;
  }

  editContact(c) {
    this.clearContactAlerts();
    this.isNewContact = false;
    this.currentContact = c;
    console.log(c);
  }

  isCurrentContact(c) {
    return c === this.currentContact;
  }

  saveContact(c) {
    this.clearContactAlerts();
    const index = this.selectedField.contacts.indexOf(c);
    if (this.isNewField) {
      if (!this.isNewContact) {
        this.updateContact(c);
      }
    } else {
      if (this.isNewContact) {
        this._contactService.createContact(this.selectedField.id, c).subscribe(
          contact => {
            this.selectedField.contacts[index] = contact;
            this.contactSavingSuccess = true;
          }, error2 => this.contactSavingError = true
        );
      } else {
        this._contactService.updateContact(this.selectedField.id, c).subscribe(
          res => this.contactSavingSuccess = true,
          error2 => this.contactSavingError = true
        );
      }
    }
    this.showContact = true;
    this.currentContact = null;
  }

  updateContact(c) {
    const updateItem = this.selectedField.contacts.find(value => value.id = c.id);
    const index = this.selectedField.contacts.indexOf(updateItem);
    this.selectedField.contacts[index] = c;
  }

  removeContact(c) {
    this.clearContactAlerts();
    if (this.isNewField) {
      this.selectedField.contacts = this.selectedField.contacts.filter(obj => obj !== c);
    } else {
      this._contactService.deleteContact(c.id).subscribe(
        res => {
          this.selectedField.contacts = this.selectedField.contacts.filter(obj => obj !== c);
          this.contactDeleteSuccess = true;
          }, error2 => this.contactDeleteError = true
      );
    }
    if (this.selectedField.contacts.length <= 0) {
      this.showContact = false;
    }
  }

  addNewFieldToAll(field) {
    this.allFields.push(field);
    this.initFields(this.allFields);
  }

  deleteFieldToAll(field) {
    this.allFields = this.allFields.filter(obj => obj !== field);
    this.initFields(this.allFields);
  }

  saveField() {
    const f = this.selectedField;
    this.savingError = false;
    this.savingSuccess = false;
    if (this.isNewField) {
      this._fieldsService.createField(f).subscribe(
        field => {
          this.addNewFieldToAll(field);
          this.savingSuccess = true;
        },
        error2 => this.savingError = true
      );
    } else {
      this._fieldsService.updateField(f).subscribe(
        data => this.savingSuccess = true,
        error2 => this.savingError = true
      );
    }
    this.clear();
  }

  deleteField() {
    const to_delete = this.selectedField;
    this._fieldsService.deleteField(to_delete).subscribe(
      data => {
        this.deleteFieldToAll(to_delete);
      }
    );
    this.clear();
  }

   private clearContactAlerts() {
    this.contactSavingError = false;
    this.contactSavingSuccess = false;
    this.contactDeleteError = false;
    this.contactDeleteSuccess = false;
  }


  clear() {
    this.selectedField = null;
    this.currentContact = null;
    this.showContact = false;
    this.isNewField = false;
    this.savingSuccess = false;
    this.savingError = false;
    this.clearContactAlerts();
  }

  openDangerPopUp(danger, text, contact) {
    this.message = text;
    this.modalDanger = this._modalService.open(danger);
    this.modalDanger.result.then(
      (result) => {
        if (result === 'yes') {
          if (contact) {
            console.log(contact);
            this.removeContact(contact);
          } else {
            this.deleteField();
          }
        }
      },
      (reason) => {console.log(''); }
    );

  }

}
