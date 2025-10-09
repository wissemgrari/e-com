import { Component, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideHouse, lucideBell, lucideShoppingCart } from '@ng-icons/lucide';
import { Searchbar } from '../searchbar/searchbar.component';
import { NgOptimizedImage } from '@angular/common';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'navbar',
  imports: [NgIcon, Searchbar, NgOptimizedImage],
  viewProviders: [provideIcons({ lucideHouse, lucideBell, lucideShoppingCart })],
  template: `
    <nav class="w-full flex items-center justify-between border-b border-gray-200 pb-4">
      <a href="/" class="flex items-center">
        <img
          ngSrc="/logo.png"
          alt="TrendLama"
          [width]="36"
          [height]="36"
          class="w-6 h-6 md:w-9 md:h-9"
        />
        <p class="hidden md:block text-md font-medium tracking-wider">BERSERKSHOP.</p>
      </a>
      <div class="flex items-center gap-6">
        <searchbar />
        <a href="/">
          <ng-icon name="lucideHouse" size="1rem" color="#4a5565" />
        </a>
        <ng-icon name="lucideBell" size="1rem" color="#4a5565" />
        <div class="relative">
          <ng-icon name="lucideShoppingCart" size="1rem" color="#4a5565" />
          <span
            class="absolute -top-2.5 -right-2.5 bg-amber-400 text-gray-600 rounded-full w-4 h-4 flex items-center justify-center text-xs font-medium"
          >
            {{ cartCounts() }}
          </span>
        </div>
        <a href="/login">Sign in</a>
      </div>
    </nav>
  `,
})
export class Navbar {
  private cartService = inject(CartService);
  cartCounts = this.cartService.itemCount;
}
