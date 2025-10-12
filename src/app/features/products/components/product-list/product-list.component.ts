import { Component, signal } from '@angular/core';
import { Categories } from '../../../../shared/components/categories/categories.component';
import { Product, products } from '../../models/product.model';
import { ProductItem } from '../product-item/product-item.component';

@Component({
  selector: 'product-list',
  imports: [Categories, ProductItem],
  template: ` <div class="w-full">
    <categories />
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-12">
      @for (product of products(); track product.id) {
      <product-item [product]="product" />
      } @empty {
      <div class="col-span-full text-center text-gray-500">No products available</div>
      }
    </div>
  </div>`,
})
export class ProductList {
  products = signal<Product[]>(products);
}
