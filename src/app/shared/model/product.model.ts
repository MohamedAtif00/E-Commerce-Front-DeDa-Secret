import { BehaviorSubject } from 'rxjs';
import { Signal, signal } from '@angular/core';
import { Review } from './review.model';

class Product {
  id: string;
  name: string;
  description: string;
  categoryId: { value: string };
  price: { discount: number; price: number; total: number };
  image: Blob;
  stockQuantity: number;
}

class CreateProduct {
  name: string;
  nameArab: string;
  description: string;
  descriptionArab: string;
  discount?: number;
  categoryId: string;
  price: number;
  hasPercentage: boolean | null;
  stockQuantity: number;
}

class GetAllProducts {
  id: string;
  _name: string;
  _description: string;
  _discount: number;
  categoryId: string;
  _totalReviews: number;
  _price: { _discount: number; _price: number; _total: number };
  _stockQuantity: number;
  masterImage: any | null;
  obsMasterImage = signal('');
}

class GetSingleProduct {
  id: any;
  _name: string;
  _name_arab: string;
  _description: string;
  _description_arab: string;
  _discount: number;
  categoryId: string;
  _price: { _discount: number; _price: number; _total: number };
  _stockQuantity: number;
  masterImage: Image | null;
  images: Image[];
  reviews?: Review[];
}

class Image {
  name: string;
  isMaster: boolean;
  path: string;
  created: string;
  productId: string;
  id: string;
  url?: string = '';
}

export { Product, CreateProduct, GetAllProducts, GetSingleProduct, Image };
