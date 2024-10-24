import { AfterViewInit, Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss',
})
export class PageComponent implements AfterViewInit {
  loaded: boolean = false;
  lines: string;
  websiteColor = '';

  constructor(private route: ActivatedRoute) {}

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.loaded = true;
    this.route.data.subscribe((data) => {
      console.log(data['pageData'].value);

      this.websiteColor = data['pageData'].value.websiteColor;
      this.lines = data['pageData'].value.marquee_Eng;
    });
  }
}
