import { Injectable } from '@angular/core';
import { GenericCRUDService } from '../../core/services/genenric-crud.service';
import { development } from '../../../environments/environment';
import { Contact } from '../model/contact.model';
import { GeneralResponse } from '../../core/model/general-response.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private sendContact = development.localhosts.contact.sendContact;

  constructor(private _http: GenericCRUDService) {}

  SendContact(contact: Contact) {
    return this._http.genericPostAPIData<GeneralResponse<Contact>>(
      this.sendContact,
      contact
    );
  }
}
