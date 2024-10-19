import { AfterViewInit, Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss',
})
export class PageComponent implements AfterViewInit {
  loaded: boolean = false;

  websiteColor = '';

  constructor(private route: ActivatedRoute) {}

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.loaded = true;
    this.route.data.subscribe((data) => {
      this.websiteColor = data['pageData'].value.websiteColor;
      console.log(this.websiteColor);
    });
  }
}
