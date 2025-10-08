import { Component, signal } from '@angular/core';
import { Categories } from '../../shared/components/categories/categories.component';
import { ProductItem } from './product-item.component';
import { Product, products } from './product.model';

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
    <a href="#" class="flex justify-end mt-4 underline text-sm text-gray-500">
      View all products
    </a>
  </div>`,
})
export class ProductList {
  products = signal<Product[]>(products);
}
