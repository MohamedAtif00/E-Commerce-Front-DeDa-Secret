import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, OnInit } from '@angular/core';
import $ from 'jquery';
import 'owl.carousel';

@Component({
  selector: 'app-product-carousel',
  templateUrl: './product-carousel.component.html',
  styleUrls: ['./product-carousel.component.scss'],
  standalone: true,
  imports:[CommonModule]
})
export class ProductCarouselComponent implements OnInit  {


  items:any[] = [
    'https://cdn.shopify.com/s/files/1/0684/4923/9327/files/Body-Cravings-Lip-_-Cheek-Tint-Strawberry-2-Source-Beauty-Egypt_large.png?v=1718112601',
    'https://cdn.shopify.com/s/files/1/0684/4923/9327/files/Body-Cravings-Lip-_-Cheek-Tint-Strawberry-2-Source-Beauty-Egypt_large.png?v=1718112601',
    'https://cdn.shopify.com/s/files/1/0684/4923/9327/files/Body-Cravings-Lip-_-Cheek-Tint-Strawberry-2-Source-Beauty-Egypt_large.png?v=1718112601',
    'https://cdn.shopify.com/s/files/1/0684/4923/9327/files/Body-Cravings-Lip-_-Cheek-Tint-Strawberry-2-Source-Beauty-Egypt_large.png?v=1718112601',
    'https://cdn.shopify.com/s/files/1/0684/4923/9327/files/Body-Cravings-Lip-_-Cheek-Tint-Strawberry-2-Source-Beauty-Egypt_large.png?v=1718112601',
    'https://cdn.shopify.com/s/files/1/0684/4923/9327/files/Body-Cravings-Lip-_-Cheek-Tint-Strawberry-2-Source-Beauty-Egypt_large.png?v=1718112601',
    'https://cdn.shopify.com/s/files/1/0684/4923/9327/files/Body-Cravings-Lip-_-Cheek-Tint-Strawberry-2-Source-Beauty-Egypt_large.png?v=1718112601',
    'https://cdn.shopify.com/s/files/1/0684/4923/9327/files/Body-Cravings-Lip-_-Cheek-Tint-Strawberry-2-Source-Beauty-Egypt_large.png?v=1718112601',
    'https://cdn.shopify.com/s/files/1/0684/4923/9327/files/Body-Cravings-Lip-_-Cheek-Tint-Strawberry-2-Source-Beauty-Egypt_large.png?v=1718112601',

  ]


  ngOnInit(): void {
    const prev = document.getElementById('prev-btn')
    const next = document.getElementById('next-btn')
    const list = document.getElementById('item-list')
    
    const itemWidth = 150
    const padding = 10
    
    prev.addEventListener('click',()=>{
      list.scrollLeft -= itemWidth + padding
    })
    
    next.addEventListener('click',()=>{
      list.scrollLeft += itemWidth + padding
    })
    
  }
}
