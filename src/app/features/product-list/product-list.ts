import { Component } from '@angular/core';
import { Categories } from '../../shared/components/categories/categories';
import { ProductItem } from '../product-item/product-item';

@Component({
  selector: 'product-list',
  imports: [Categories, ProductItem],
  templateUrl: './product-list.html',
})
export class ProductList {}
