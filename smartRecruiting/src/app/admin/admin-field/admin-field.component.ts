import { Component, OnInit } from '@angular/core';
import {Field} from '../../shared/field';
import {Contact} from '../../shared/contact';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FieldService} from '../../services/field.service';
import {ContactService} from '../../services/contact.service';

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

  form: FormGroup;

  constructor(
    private fieldService: FieldService,
    private contactService: ContactService,
  ) { }


  initFields(fields) {
    this.allFields = fields;
    this.fields = Object.assign([], this.allFields);
  }

  ngOnInit() {
    this.fieldService.getAllFields().subscribe(
      data => this.initFields(data)
    );
    this.selectedField = null;
    this.currentContact = null;
    this.showContact = false;
    this.isNewField = false;
    this.isNewContact = false;
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'website': new FormControl(null, Validators.required)
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

  get name() {return this.form.get('name'); }
  get description() {return this.form.get('description'); }
  get website() {return this.form.get('website'); }

  addField() {
    this.selectedField = new Field();
    this.selectedField.contacts = [];
    this.showContact = false;
    this.isNewField = true;
  }

  selectField(f) {
    this.selectedField = f;
    this.showContact = (f.contacts && f.contacts.length > 0);
  }

  addContact() {
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
    this.isNewContact = false;
    this.currentContact = c;
    console.log(c);
  }

  isCurrentContact(c) {
    return c === this.currentContact;
  }

  saveContact(c) {
    if (this.isNewField) {
      if (!this.isNewContact) {
        this.updateContact(c);
      }
    } else {
      if (this.isNewContact) {
        this.contactService.createContact(this.selectedField.id, c).subscribe(
          contact => c = contact
        );
      } else {
        this.contactService.updateContact(this.selectedField.id, c);
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
    if (this.isNewField) {
      this.selectedField.contacts = this.selectedField.contacts.filter(obj => obj !== c);
    } else {
      console.log(c);
      this.contactService.deleteContact(c.id).subscribe(
        res => this.selectedField.contacts = this.selectedField.contacts.filter(obj => obj !== c)
      );
    }
    if (this.selectedField.contacts.length <= 0) {
      this.showContact = false;
    }
  }

  saveField() {
    const f = this.selectedField;
    if (this.isNewField) {
      this.fieldService.createField(f).subscribe(
        field => this.allFields.push(field));
    } else {
      this.fieldService.updateField(f).subscribe(data => console.log('coucou!'));
    }
    this.clear();
  }

  deleteField() {
    const to_delete = this.selectedField;
    this.fieldService.deleteField(to_delete).subscribe(
      data => this.allFields = this.allFields.filter(obj => obj !== to_delete)
    );
    this.clear();
  }

  clear() {
    this.selectedField = null;
    this.currentContact = null;
    this.showContact = false;
    this.isNewField = false;
  }

}
