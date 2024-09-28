import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-slide-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slide-dropdown.component.html',
  styleUrl: './slide-dropdown.component.scss',
  animations: [
    trigger('dropdownAnimation', [
      state(
        'void',
        style({
          height: '0',
          opacity: 0,
          transform: 'translateY(-10px)',
        })
      ),
      state(
        '*',
        style({
          height: '*',
          opacity: 1,
          transform: 'translateY(0)',
        })
      ),
      transition('void <=> *', animate('300ms ease-in-out')),
    ]),
  ],
})
export class SlideDropdownComponent {
  @Input() title: string = 'Dropdown'; // Title of the dropdown
  @Input() items: string[] = []; // List of items in the dropdown

  @Output() itemSelected = new EventEmitter<string>(); // EventEmitter for selected item

  isOpen = false;
  activeItem: string | null = null;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  setActiveItem(item: string) {
    this.activeItem = item;
    this.itemSelected.emit(item); // Emit the selected item
  }
}
