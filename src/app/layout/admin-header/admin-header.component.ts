import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { TranslationService } from '../../core/services/translation.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subject, filter } from 'rxjs';
import { RouteService } from '../../core/services/route.service';
import { data } from 'jquery';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.scss'
})
export class AdminHeaderComponent implements OnInit{

  currentRoute: string;

  constructor(private route:RouteService,public translate:TranslationService) { }

  ngOnInit(): void {
    this.route.currentRoute.subscribe((data: string) => {
      let route = data.split('/');
      this.currentRoute = route[route.length -1 ]   
     })  
  }


    SetLnaguage(lang:string)
  { 
    this.translate.changeLanguage(lang);
  }


}
