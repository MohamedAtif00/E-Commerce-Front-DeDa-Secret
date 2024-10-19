import { Component, OnDestroy, OnInit } from '@angular/core';
import { BasketService } from '../../shared/services/basket.service';
import { initFlowbite } from 'flowbite';
import { Meta, Title } from '@angular/platform-browser';
import AOS from 'aos';
import { ActivatedRoute } from '@angular/router';
import { AdministrationService } from '../../core/services/administration.service';
import { Carousel } from '../../shared/model/carsoul.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  homeData: any;
  carousels: Carousel[];
  constructor(
    private basketService: BasketService,
    private meta: Meta,
    private title: Title,
    private route: ActivatedRoute,
    private adminService: AdministrationService
  ) {
    this.meta.addTags([
      { name: 'description', content: 'Deda Secret website' },
      { name: 'author', content: 'buttercms' },
      { name: 'keywords', content: 'Cosmatics, Beauty,DedaSecret,dedasecret ' },
    ]);
    this.setTitle('Home Page');
  }

  ngOnInit(): void {
    AOS.init();
    this.adminService.GetAdministration().subscribe((data) => {
      this.carousels = data.value.groups;
    });
    this.basketService.cart$.subscribe((data) => {});
    this.route.data.subscribe((data) => {
      this.homeData = data['homeData'].value.websiteColor;
      console.log('home data', this.homeData);
    });
  }

  public setTitle(newTitle: string) {
    this.title.setTitle(newTitle);
  }
}
