import { Component, OnInit } from '@angular/core';
import { TranslationService } from '../../../core/services/translation.service';
import { initFlowbite } from 'flowbite';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-shipment',
  templateUrl: './shipment.component.html',
  styleUrl: './shipment.component.scss',
})
export class ShipmentComponent implements OnInit {
  activeTab: string = 'all-deliveries'; // Set default active tab

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  constructor(public translation: TranslationService) {}

  ngOnInit(): void {
    initFlowbite();
  }
}
