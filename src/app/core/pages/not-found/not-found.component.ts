import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div
      class="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 animate-fade-in"
    >
      <div class="mb-8">
        <h1 class="text-9xl font-bold text-gray-200 animate-bounce-slow">404</h1>
        <h2 class="text-3xl font-semibold text-gray-800 mt-4">Page Not Found</h2>
        <p class="text-gray-600 mt-2">Sorry, the page you're looking for doesn't exist.</p>
      </div>

      <div class="flex gap-4">
        <a
          routerLink="/"
          class="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-300 hover:scale-105"
        >
          Go Home
        </a>
        <a
          routerLink="/products"
          class="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105"
        >
          Browse Products
        </a>
      </div>
    </div>
  `,
})
export class NotFound {}
