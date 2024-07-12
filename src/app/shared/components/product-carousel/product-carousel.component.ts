import { CommonModule } from '@angular/common';
import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-product-carousel',
  templateUrl: './product-carousel.component.html',
  styleUrls: ['./product-carousel.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ProductCarouselComponent implements OnInit, AfterViewInit {
  items: string[] = [
    'https://cdn.shopify.com/s/files/1/0684/4923/9327/files/Body-Cravings-Lip-_-Cheek-Tint-Strawberry-2-Source-Beauty-Egypt_large.png?v=1718112601',
    'https://cdn.shopify.com/s/files/1/0684/4923/9327/files/Body-Cravings-Lip-_-Cheek-Tint-Strawberry-2-Source-Beauty-Egypt_large.png?v=1718112601',
    'https://cdn.shopify.com/s/files/1/0684/4923/9327/files/Body-Cravings-Lip-_-Cheek-Tint-Strawberry-2-Source-Beauty-Egypt_large.png?v=1718112601',
    'https://cdn.shopify.com/s/files/1/0684/4923/9327/files/Body-Cravings-Lip-_-Cheek-Tint-Strawberry-2-Source-Beauty-Egypt_large.png?v=1718112601',
    'https://cdn.shopify.com/s/files/1/0684/4923/9327/files/Body-Cravings-Lip-_-Cheek-Tint-Strawberry-2-Source-Beauty-Egypt_large.png?v=1718112601',
    'https://cdn.shopify.com/s/files/1/0684/4923/9327/files/Body-Cravings-Lip-_-Cheek-Tint-Strawberry-2-Source-Beauty-Egypt_large.png?v=1718112601',
    'https://cdn.shopify.com/s/files/1/0684/4923/9327/files/Body-Cravings-Lip-_-Cheek-Tint-Strawberry-2-Source-Beauty-Egypt_large.png?v=1718112601',
    'https://cdn.shopify.com/s/files/1/0684/4923/9327/files/Body-Cravings-Lip-_-Cheek-Tint-Strawberry-2-Source-Beauty-Egypt_large.png?v=1718112601',
    'https://cdn.shopify.com/s/files/1/0684/4923/9327/files/Body-Cravings-Lip-_-Cheek-Tint-Strawberry-2-Source-Beauty-Egypt_large.png?v=1718112601',
    // Add more image URLs as needed
  ];

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const prev = document.getElementById('prev-btn');
    const next = document.getElementById('next-btn');
    const list = document.getElementById('item-list');

    const itemWidth = 150;
    const padding = 10;

    prev.addEventListener('click', () => {
      list.scrollLeft -= itemWidth + padding;
      handleScroll();
    });

    next.addEventListener('click', () => {
      list.scrollLeft += itemWidth + padding;
      handleScroll();
    });

    // Automatically scroll left every 5 seconds
    setInterval(() => {
      list.scrollLeft += itemWidth + padding;
      handleScroll();
    }, 5000);

    function handleScroll() {
      const maxScrollLeft = list.scrollWidth - list.clientWidth;

      if (list.scrollLeft <= 0) {
        moveItemsToEnd();
      } else if (list.scrollLeft >= maxScrollLeft) {
        moveItemsToStart();
      }
    }

    function moveItemsToEnd() {
      const items = Array.from(list.children);
      const firstItem = items[0];
      list.appendChild(firstItem);
      list.scrollLeft += itemWidth + padding;
    }

    function moveItemsToStart() {
      const items = Array.from(list.children);
      const lastItem = items[items.length - 1];
      list.insertBefore(lastItem, items[0]);
      list.scrollLeft -= itemWidth + padding;
    }

    list.addEventListener('scroll', () => {
      const maxScrollLeft = list.scrollWidth - list.clientWidth;

      if (list.scrollLeft <= 0) {
        moveItemsToEnd();
      } else if (list.scrollLeft >= maxScrollLeft) {
        moveItemsToStart();
      }
    });
  }
}
