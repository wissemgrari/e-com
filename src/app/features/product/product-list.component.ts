import { Component } from '@angular/core';
import { Categories } from '../../shared/components/categories/categories.component';
import { ProductItem } from './product-item.component';

@Component({
  selector: 'product-list',
  imports: [Categories, ProductItem],
  template: ` <div class="w-full">
    <categories />
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-12">
      <product-item />
    </div>
    <a href="#" class="flex justify-end mt-4 underline text-sm text-gray-500">
      View all products
    </a>
  </div>`,
})
export class ProductList {}
