import { Injectable, signal, computed } from '@angular/core';
import { Product, products } from '../../features/products/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // All products (simulate database)
  private allProducts = signal<Product[]>(products);

  // Selected category filter
  private selectedCategory = signal<string>('all');

  // Search query
  private searchQuery = signal<string>('');

  // Filtered products based on category and search
  readonly filteredProducts = computed(() => {
    const category = this.selectedCategory();
    const query = this.searchQuery().toLowerCase().trim();
    let filtered = this.allProducts();

    // Filter by category
    if (category !== 'all') {
      filtered = filtered.filter((product) => product.category === category);
    }

    // Filter by search query
    if (query) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.shortDescription.toLowerCase().includes(query)
      );
    }

    return filtered;
  });

  // Read-only signals
  readonly products = this.allProducts.asReadonly();
  readonly currentCategory = this.selectedCategory.asReadonly();
  readonly currentSearchQuery = this.searchQuery.asReadonly();

  setCategory(category: string) {
    this.selectedCategory.set(category);
  }

  setSearchQuery(query: string) {
    this.searchQuery.set(query);
  }

  clearSearch() {
    this.searchQuery.set('');
  }

  // For future API integration
  async loadProductsFromAPI(category?: string): Promise<void> {
    try {
      // TODO: Replace with actual API call
      // For now, we using mock data
      this.allProducts.set(products);
    } catch (error) {
      console.error('Error loading products:', error);
    }
  }
}
