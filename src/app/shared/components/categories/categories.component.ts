import { Component, computed, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideBriefcase,
  lucideFootprints,
  lucideGlasses,
  lucideHand,
  lucideShirt,
  lucideShoppingBasket,
  lucideVenus,
} from '@ng-icons/lucide';
import { data, Category } from './categories.model';

@Component({
  selector: 'categories',
  standalone: true,
  imports: [NgIcon],
  viewProviders: [
    provideIcons({
      lucideFootprints,
      lucideGlasses,
      lucideBriefcase,
      lucideShirt,
      lucideShoppingBasket,
      lucideHand,
      lucideVenus,
    }),
  ],
  template: `
    <div
      class="sticky shadow-lg top-0 z-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 bg-gray-100 p-2 rounded-lg mb-4 text-sm"
    >
      @for (category of categories(); track category.slug) {
      <div
        class="flex items-center justify-center gap-2 cursor-pointer px-2 py-1 rounded-md"
        [class]="category.slug === selectedCategory() ? 'bg-white' : 'text-gray-500'"
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
  categories = signal<Category[]>(data);
  selectedCategory = signal<string>('all');

  activeCategory = computed(() =>
    this.categories().find((cat) => cat.slug === this.selectedCategory())
  );

  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe((params) => {
      this.selectedCategory.set(params['category'] || 'all');
    });
  }

  handleChange(value: string) {
    const currentUrl = this.router.url.split('?')[0];
    const params = new URLSearchParams(window.location.search);
    if (value === 'all') {
      params.delete('category');
    } else {
      params.set('category', value);
    }
    const queryString = params.toString();
    const newUrl = queryString ? `${currentUrl}?${queryString}` : currentUrl;
    // Update the signal and navigate
    this.selectedCategory.set(value);
    this.router.navigateByUrl(newUrl);
  }
}
