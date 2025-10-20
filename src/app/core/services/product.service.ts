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

  // Filtered products based on category
  readonly filteredProducts = computed(() => {
    const category = this.selectedCategory();
    const allProds = this.allProducts();

    if (category === 'all') {
      return allProds;
    }

    return allProds.filter((product) => product.category === category);
  });

  // Read-only signals
  readonly products = this.allProducts.asReadonly();
  readonly currentCategory = this.selectedCategory.asReadonly();

  setCategory(category: string) {
    this.selectedCategory.set(category);
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
