import { Component } from '@angular/core';
import { ProductList } from '../product/product-list.component';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'home',
  imports: [ProductList, NgOptimizedImage],
  template: `
    <div class="relative aspect-[3/1] mb-12">
      <img ngSrc="/featured.png" alt="Featured Product" height="576" width="1728"/>
    </div>
    <product-list/>
  `,
})
export class Home {}
