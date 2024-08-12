import { AfterViewInit, Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { AdministrationService } from './core/services/administration.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit{
  title = 'E-Commerce';


  constructor(private adminService:AdministrationService) { }


  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    initFlowbite();
  }
  
}
