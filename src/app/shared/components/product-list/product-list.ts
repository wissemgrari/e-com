import { Component } from '@angular/core';
import { Categories } from '../categories/categories';

@Component({
  selector: 'product-list',
  imports: [Categories],
  templateUrl: './product-list.html',
})
export class ProductList {}
