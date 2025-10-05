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

interface Category {
  name: string;
  icon: string;
  slug: string;
}

@Component({
  selector: 'categories',
  templateUrl: './categories.html',
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
})
export class Categories {
  categories = signal<Category[]>([
    {
      name: 'All',
      icon: 'lucideShoppingBasket',
      slug: 'all',
    },
    {
      name: 'T-shirts',
      icon: 'lucideShirt',
      slug: 't-shirts',
    },
    {
      name: 'Shoes',
      icon: 'lucideFootprints',
      slug: 'shoes',
    },
    {
      name: 'Accessories',
      icon: 'lucideGlasses',
      slug: 'accessories',
    },
    {
      name: 'Bags',
      icon: 'lucideBriefcase',
      slug: 'bags',
    },
    {
      name: 'Dresses',
      icon: 'lucideVenus',
      slug: 'dresses',
    },
    {
      name: 'Jackets',
      icon: 'lucideShirt',
      slug: 'jackets',
    },
    {
      name: 'Gloves',
      icon: 'lucideHand',
      slug: 'gloves',
    },
  ]);

  selectedCategory = signal<string>('all');

  // Computed signal for the active category
  activeCategory = computed(() =>
    this.categories().find((cat) => cat.slug === this.selectedCategory())
  );

  constructor(private router: Router, private route: ActivatedRoute) {
    // Update selectedCategory signal when URL params change
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
