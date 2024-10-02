import { AfterViewInit, Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { AdministrationService } from './core/services/administration.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from './core/services/translation.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { RouteService } from './core/services/route.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'E-Commerce';

  constructor(
    private adminService: AdministrationService,
    public translate: TranslationService,
    private router: Router,
    private routerService: RouteService
  ) {
    translate.GetLanguage();

    // Optionally, use the browser's language
    // const browserLang = translate.getBrowserLang();
    // translate.use(browserLang.match(/ar|en/) ? browserLang : 'ar');
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.routerService.currentRoute.next(event.url as string);
      });
  }

  ngAfterViewInit(): void {
    initFlowbite();
  }
}
