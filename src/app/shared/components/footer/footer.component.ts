import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [
    NgOptimizedImage
  ],
  template: `
    <footer
      class="mt-16 flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between md:gap-0 bg-gray-800 p-8 rounded-lg">
      <div class="flex flex-col gap-4 items-center md:items-start">
        <a href="/" class="flex items-center">
          <img ngSrc="/logo.png" alt="BERSERKSHOP" [width]="36" [height]="36" />
          <p class="hidden md:block text-md font-medium tracking-wider text-white">
            BERSERKSHOP.
          </p>
        </a>
        <p class="text-sm text-gray-400">© 2025 BERSERKSHOP.</p>
        <p class="text-sm text-gray-400">All rights reserved.</p>
      </div>
      <div class="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
        <p class="text-sm text-amber-50">links</p>
        <a href="/">Homepage</a>
        <a href="/">Contact</a>
        <a href="/">Terms of Service</a>
        <a href="/">Privacy Policy</a>
      </div>
      <div class="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
        <p class="text-sm text-amber-50">links</p>
        <a href="/">All Products</a>
        <a href="/">New Arrivals</a>
        <a href="/">Best Sellers</a>
        <a href="/">Sale</a>
      </div>
      <div class="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
        <p class="text-sm text-amber-50">links</p>
        <a href="/">About</a>
        <a href="/">Contact</a>
        <a href="/">Blog</a>
        <a href="/">Affiliate Program</a>
      </div>
    </footer>
  `
})
export class Footer {}
