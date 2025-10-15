import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ProductList } from '../products/components/product-list/product-list.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'home',
  imports: [ProductList, NgOptimizedImage, RouterLink],
  template: `
    <div class="relative aspect-[3/1] mb-12">
      <img ngSrc="/featured.png" alt="Featured Product" height="576" width="1728" priority />
    </div>
    <product-list />
    <a routerLink="products" class="flex justify-end mt-4 underline text-sm text-gray-500">
      View all products
    </a>
  `,
})
export class Home {}
