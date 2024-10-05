import { Component, OnInit } from '@angular/core';
import { BasketService } from '../../shared/services/basket.service';
import { initFlowbite } from 'flowbite';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private basketService: BasketService,
    private meta: Meta,
    private title: Title
  ) {
    this.meta.addTags([
      { name: 'description', content: 'Deda Secret website' },
      { name: 'author', content: 'buttercms' },
      { name: 'keywords', content: 'Cosmatics, Beauty,DedaSecret,dedasecret ' },
    ]);
    this.setTitle('Home Page');
  }

  ngOnInit(): void {
    this.basketService.cart$.subscribe((data) => {});
  }

  public setTitle(newTitle: string) {
    this.title.setTitle(newTitle);
  }
}
