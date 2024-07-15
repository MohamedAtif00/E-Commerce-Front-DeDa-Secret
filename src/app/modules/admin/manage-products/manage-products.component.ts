import { Component, OnInit } from '@angular/core';
import { Dropdown } from 'flowbite';
import type { DropdownOptions, DropdownInterface, InstanceOptions } from 'flowbite';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrl: './manage-products.component.scss'
})
export class ManageProductsComponent implements OnInit{

  Status: string = 'Status';
  options: DropdownOptions;
  dropdown: DropdownInterface;


  ngOnInit(): void {
    initFlowbite()
    this.DropdownListConfiguratioon()
  }


  AllClicked()
  {
    this.Status = 'All'
    console.log(this.dropdown.isVisible());
    this.dropdown.hide()
    
  }




  DropdownListConfiguratioon() { 
    // set the dropdown menu element
    const $targetEl: HTMLElement = document.getElementById('dropdown');

    // set the element that trigger the dropdown menu on click
    const $triggerEl: HTMLElement = document.getElementById('dropdownDefaultButton');

    // options with default values
    this.options = {
        triggerType: 'click',
        delay: 300,
        onHide: () => {
            console.log('dropdown has been hidden');
        },
        onShow: () => {
            console.log('dropdown has been shown');
        },
        onToggle: () => {
            console.log('dropdown has been toggled');
        },
    };

    // instance options object
    // const instanceOptions: InstanceOptions = {
    //   id: 'dropdownMenu',
    //   override: true
    // };

    /*
    * targetEl: required
    * triggerEl: required
    * options: optional
    * instanceOptions: optional
    */
    this.dropdown = new Dropdown(
        $targetEl,
        $triggerEl,
        this.options,
    );

    // show the dropdown
    // this.dropdown.show();
  }


}
