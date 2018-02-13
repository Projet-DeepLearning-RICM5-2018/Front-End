import { Component, OnInit } from '@angular/core';
import {Field} from '../../shared/field';
import {Contact} from '../../shared/contact';

@Component({
  selector: 'app-admin-field',
  templateUrl: './admin-field.component.html',
  styleUrls: ['./admin-field.component.css']
})
export class AdminFieldComponent implements OnInit {

  public fields: Field[];
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

  private RICM: Field = {
    id: 1,
    name: 'RICM',
    description: 'Fausse filière',
    website: 'polytech-grenoble.fr',
    descriptor: null,
    contacts: [this.Contact1]
  };
  private PRI: Field = {
    id: 2,
    name: 'PRI',
    description: 'Prévention des risques',
    website: 'polytech-grenoble.fr',
    descriptor: null,
    contacts: null
  };
  private GGC: Field = {
    id: 3,
    name: 'GGC',
    description: 'Géotechniques',
    website: 'polytech-grenoble.fr',
    descriptor: null,
    contacts: null
  };

  private TestFields = [this.RICM, this.PRI, this.GGC];

  constructor() { }

  ngOnInit() {
    this.fields = this.TestFields;
    this.selectedField = null;
    this.currentContact = null;
    this.showContact = false;
    this.isnew = false;
  }

  addField() {
    this.selectedField = new Field();
    this.selectedField.contacts = [];
    this.showContact = false;
    this.isnew = true;
  }

  selectField(f) {
    this.selectedField = f;
    this.showContact = (f.contacts !== null && f.contacts.length > 0);
  }
  addContact() {
    this.showContact = true;
    const newcontact = new Contact();
    if (this.selectedField.contacts === null) {
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
    if (this.isnew) {
      this.fields.push(this.selectedField);
    }
    this.clear();
  }

  deleteField() {
    this.fields = this.fields.filter(obj => obj !== this.selectedField);
    this.clear();
  }

  clear() {
    this.selectedField = null;
    this.currentContact = null;
    this.showContact = false;
    this.isnew = false;
  }

}
