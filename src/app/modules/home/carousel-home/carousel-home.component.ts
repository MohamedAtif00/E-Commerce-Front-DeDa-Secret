import { Component } from '@angular/core';
import { CarouselItem, CarouselOptions, InstanceOptions, CarouselInterface, Carousel } from 'flowbite';

@Component({
  selector: 'app-carousel-home',
  templateUrl: './carousel-home.component.html',
  styleUrl: './carousel-home.component.scss'
})
export class CarouselHomeComponent {

  ngOnInit(): void {
    const carouselElement: HTMLElement = document.getElementById('indicators-carousel');

      const items: CarouselItem[] = [
          {
              position: 0,
              el: document.getElementById('carousel-item-1'),
          },
          {
              position: 1,
              el: document.getElementById('carousel-item-2'),
          },
          {
              position: 2,
              el: document.getElementById('carousel-item-3'),
          },
          {
              position: 3,
              el: document.getElementById('carousel-item-4'),
          },
      ];

      const options: CarouselOptions = {
          defaultPosition: 1,
          interval: 3000,
          indicators: {
              activeClasses: 'bg-blue-600',
              inactiveClasses: 'bg-blue-300',
              items: [
                  {
                      position: 0,
                      el: document.getElementById('carousel-indicator-1'),
                  },
                  {
                      position: 1,
                      el: document.getElementById('carousel-indicator-2'),
                  },
                  {
                      position: 2,
                      el: document.getElementById('carousel-indicator-3'),
                  },
                  {
                      position: 3,
                      el: document.getElementById('carousel-indicator-4'),
                  },
              ],
          },
          onNext: () => {
              console.log('next slider item is shown');
          },
          onPrev: () => {
              console.log('previous slider item is shown');
          },
          onChange: () => {
              console.log('new slider item has been shown');
          },
      };

      const instanceOptions: InstanceOptions = {
        id: 'carousel-example',
        override: true
      };

      const carousel: CarouselInterface = new Carousel(carouselElement, items, options, instanceOptions);

      carousel.cycle();

      const $prevButton = document.getElementById('data-carousel-prev');
      const $nextButton = document.getElementById('data-carousel-next');

      $prevButton.addEventListener('click', () => {
          carousel.prev();
      });

      $nextButton.addEventListener('click', () => {
          carousel.next();
      });



}


}
