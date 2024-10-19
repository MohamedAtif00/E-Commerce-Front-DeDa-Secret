import { Product } from './product.model';

export interface Carousel {
  id: { value: string };
  groupName: string;
  products?: Product[];
  productsCount?: number;
}
