import { Component, inject, OnDestroy } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideSearch, lucideX } from '@ng-icons/lucide';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../core/services/product.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'searchbar',
  standalone: true,
  imports: [NgIcon, FormsModule],
  viewProviders: [provideIcons({lucideSearch, lucideX})],
  template: `
    <div
        class="hidden sm:flex items-center gap-2 rounded-full ring-1 ring-gray-200 px-3 py-2 shadow-md bg-white"
    >
      <ng-icon name="lucideSearch" size="1rem" color="#4a5565"/>
      <input
          [(ngModel)]="searchQuery"
          (input)="onSearchChange()"
          (keyup.enter)="onSearch()"
          id="search"
          type="text"
          placeholder="Search products..."
          class="text-sm outline-0 placeholder:text-gray-400 w-52"
      />
      @if (searchQuery) {
        <button
            (click)="clearSearch()"
            class="w-5 h-5 rounded-full flex items-center justify-center hover:bg-gray-200 transition duration-200"
            type="button"
            aria-label="Clear search"
        >
          <ng-icon name="lucideX" size="14px" color="#4a5565"/>
        </button>
      }
    </div>
  `,
})
export class Searchbar implements OnDestroy {
  private productService = inject(ProductService);
  private router = inject(Router);

  searchQuery = '';
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor() {
    this.searchSubject
    .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
    )
    .subscribe((query) => {
      this.productService.setSearchQuery(query);

      if (!this.router.url.includes('/products')) {
        this.router.navigate(['/products'], {
          queryParams: {search: query || undefined},
          queryParamsHandling: 'merge',
        });
      }
    });
  }

  onSearchChange() {
    this.searchSubject.next(this.searchQuery);
  }

  onSearch() {
    this.productService.setSearchQuery(this.searchQuery);

    // Navigate to products page
    this.router.navigate(['/products'], {
      queryParams: {search: this.searchQuery || undefined},
      queryParamsHandling: 'merge',
    });
  }

  clearSearch() {
    this.searchQuery = '';
    this.productService.clearSearch();
    this.searchSubject.next(''); // Trigger debounced clear

    this.router.navigate([], {
      queryParams: {search: null},
      queryParamsHandling: 'merge',
      relativeTo: this.router.routerState.root,
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
