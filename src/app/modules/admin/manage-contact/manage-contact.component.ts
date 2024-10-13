import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { DropdownOptions, DropdownInterface, Dropdown } from 'flowbite';
import { PageList } from '../../../core/model/general-response.model';
import { TranslationService } from '../../../core/services/translation.service';
import { GetAllProducts } from '../../../shared/model/product.model';
import { ProductService } from '../../../shared/services/product.service';
import { AdministrationService } from '../administration.service';
import { ModalService } from '../../../shared/services/modal.service';
import { Contact } from '../../../shared/model/contact.model';
import { ContactService } from '../../../shared/services/contact.service';

interface Products extends GetAllProducts {
  checked: boolean;
}

@Component({
  selector: 'app-manage-contact',
  templateUrl: './manage-contact.component.html',
  styleUrl: './manage-contact.component.scss',
})
export class ManageContactComponent implements OnInit {
  contacts: Contact[];
  currentLang: string;

  constructor(
    public translation: TranslationService,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.contactService.GetAllContact().subscribe((data) => {
      console.log(data);
      this.contacts = data.value;
    });
  }
}
