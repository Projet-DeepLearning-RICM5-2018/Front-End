import { Component, OnInit } from '@angular/core';
import {Field} from '../../shared/field';
import {Contact} from '../../shared/contact';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FieldService} from "../../services/field.service";

@Component({
  selector: 'app-admin-field',
  templateUrl: './admin-field.component.html',
  styleUrls: ['./admin-field.component.css']
})
export class AdminFieldComponent implements OnInit {

  fieldsRoute = 'http://localhost:5555/fields';

  public fields: any;
  public selectedField: Field;
  public currentContact: Contact;
  public showContact: boolean;
  public isnew: boolean;

  private Contact1: Contact = {
    id: 1,
    name: 'Jeanne',
    surname: 'Ellaihou',
    email: 'mail@to',
    role: 'Administrateur',
    phone: '0123456789'
  };

  form: FormGroup;

  constructor(
    private http: HttpClient,
    private fieldService: FieldService,
  ) { }

  ngOnInit() {
    this.http.get(this.fieldsRoute).subscribe(data => this.fields = data);
    this.selectedField = null;
    this.currentContact = null;
    this.showContact = false;
    this.isnew = false;
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'website': new FormControl(null, Validators.required)
    });
  }

  get name() {return this.form.get('name');}
  get description() {return this.form.get('description');}
  get website() {return this.form.get('website');}

  addField() {
    this.selectedField = new Field();
    this.selectedField.contacts = [];
    this.showContact = false;
    this.isnew = true;
  }

  selectField(f) {
    this.selectedField = f;
    this.showContact = (f.contacts && f.contacts.length > 0);
  }

  addContact() {
    this.showContact = true;
    const newcontact = new Contact();
    if (!this.selectedField.contacts) {
      this.selectedField.contacts = [];
    }
    this.selectedField.contacts.push(newcontact);
    this.currentContact = newcontact;
  }

  editContact(c) {
    this.currentContact = c;
  }

  isCurrentContact(c) {
    return c === this.currentContact;
  }

  saveContact(c) {
    this.removeContact(c);
    this.selectedField.contacts.push(c);
    this.showContact = true;
    this.currentContact = null;
  }

  removeContact(c) {
    this.selectedField.contacts = this.selectedField.contacts.filter(obj => obj !== c);
    if (this.selectedField.contacts.length <= 0) {
      this.showContact = false;
    }
  }

  saveField() {
    const f = this.selectedField;
    if (this.isnew) {
      this.fieldService.createField(f).subscribe(
        field => this.fields.push(field));
    } else {
      this.fieldService.updateField(f).subscribe(data => console.log('coucou!'));
    }
    this.clear();
  }

  deleteField() {
    const to_delete = this.selectedField;
    this.fieldService.deleteField(to_delete).subscribe(
      data => this.fields = this.fields.filter(obj => obj !== to_delete)
    );
    // this.fields = this.fields.filter(obj => obj !== this.selectedField)
    this.clear();
  }

  clear() {
    this.selectedField = null;
    this.currentContact = null;
    this.showContact = false;
    this.isnew = false;
  }

}
