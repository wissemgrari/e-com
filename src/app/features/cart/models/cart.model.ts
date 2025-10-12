import { Product } from '../../products/models/product.model';

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}
