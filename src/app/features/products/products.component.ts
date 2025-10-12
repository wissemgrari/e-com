import { Component } from '@angular/core';
import { ProductList } from './components/product-list/product-list.component';

@Component({
  selector: 'products',
  standalone: true,
  imports: [ProductList],
  template: `
    <div>
      <product-list />
    </div>
  `,
})
export class Products {}
