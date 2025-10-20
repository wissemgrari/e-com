import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  hugeDress01,
  hugeGlasses,
  hugeHoodie,
  hugeLongSleeveShirt,
  hugeRunningShoes,
  hugeShirt01,
  hugeShoppingBag03,
} from '@ng-icons/huge-icons';
import { ProductService } from '../../../core/services/product.service';
import { data } from './categories.model';

@Component({
  selector: 'categories',
  standalone: true,
  imports: [NgIcon],
  viewProviders: [
    provideIcons({
      hugeShoppingBag03,
      hugeShirt01,
      hugeHoodie,
      hugeLongSleeveShirt,
      hugeRunningShoes,
      hugeDress01,
      hugeGlasses,
    }),
  ],
  template: `
    <div
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-2 bg-gray-100 p-2 rounded-lg mb-4 text-sm"
    >
      @for (category of categories; track category.slug) {
      <div
        class="flex items-center justify-center gap-2 cursor-pointer px-2 py-1 rounded-md"
        [class]="category.slug === productService.currentCategory() ? 'bg-white' : 'text-gray-500'"
        (click)="handleChange(category.slug)"
      >
        <ng-icon [name]="category.icon" />
        {{ category.name }}
      </div>
      } @empty {
      <div class="col-span-full text-center text-gray-500">No categories available</div>
      }
    </div>
  `,
})
export class Categories {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  productService = inject(ProductService);

  categories = data;

  constructor() {
    // Sync category from URL on init
    this.route.queryParams.subscribe((params) => {
      const category = params['category'] || 'all';
      this.productService.setCategory(category);
    });
  }

  handleChange(value: string) {
    // Update product service
    this.productService.setCategory(value);

    // Update URL
    const currentUrl = this.router.url.split('?')[0];
    if (value === 'all') {
      this.router.navigate([currentUrl]);
    } else {
      this.router.navigate([currentUrl], { queryParams: { category: value } });
    }
  }
}
