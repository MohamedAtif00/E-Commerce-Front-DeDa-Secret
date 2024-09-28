import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { TranslationService } from '../../core/services/translation.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subject, filter } from 'rxjs';
import { RouteService } from '../../core/services/route.service';
import { data } from 'jquery';
import { TranslateService } from '@ngx-translate/core';
import { BostaAuthentication } from '../../modules/admin/shipment/service/bosta-auth.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.scss',
})
export class AdminHeaderComponent implements OnInit {
  currentRoute: string;

  constructor(
    private route: RouteService,
    public translate: TranslationService,
    private router: Router,
    public auth: BostaAuthentication
  ) {}

  ngOnInit(): void {
    this.route.currentRoute.subscribe((data: string) => {
      let route = data.split('/');
      this.currentRoute = route[route.length - 1];
    });
  }

  SetLnaguage(lang: string) {
    this.translate.changeLanguage(lang);
  }

  onItemSelected(item: string) {
    // Route based on the selected item
    console.log(item);

    if (item === 'Dashboard') {
      this.router.navigate(['admin/shipment']);
    } else if (item === 'Profile') {
      this.router.navigate(['admin/shipment/profile']);
    }
  }
}
