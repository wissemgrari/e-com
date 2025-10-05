import { Component } from '@angular/core';
import { ProductList } from '../product/product-list.component';

@Component({
  selector: 'home',
  imports: [ProductList],
  template: `
    <div class="relative aspect-[3/1] mb-12">
      <img src="/featured.png" class="fill" alt="Featured Product" />
    </div>
    <product-list />
  `,
})
export class Home {}
