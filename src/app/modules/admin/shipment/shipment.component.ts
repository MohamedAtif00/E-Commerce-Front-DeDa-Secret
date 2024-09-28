import { Component } from '@angular/core';
import { TranslationService } from '../../../core/services/translation.service';

@Component({
  selector: 'app-shipment',
  templateUrl: './shipment.component.html',
  styleUrl: './shipment.component.scss',
})
export class ShipmentComponent {
  constructor(public translation: TranslationService) {}
}
