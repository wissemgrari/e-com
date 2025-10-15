import { Injectable, signal, computed, effect } from '@angular/core';
import { CartItem } from '../../features/cart/models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly STORAGE_KEY = 'cart_items';
  private cartItems = signal<CartItem[]>(this.loadFromLocalStorage());

  // Read-only computed values
  readonly items = this.cartItems.asReadonly();
  readonly itemCount = computed(() => this.cartItems().length);
  readonly totalPrice = computed(() =>
    this.cartItems().reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  constructor() {
    // Auto-save to localStorage whenever cart changes
    effect(() => {
      const items = this.cartItems();
      this.saveToLocalStorage(items);
    });
  }

  addToCart(item: CartItem) {
    this.cartItems.update((items) => [...items, item]);
  }

  removeFromCart(itemId: string | number) {
    this.cartItems.update((items) => items.filter((item) => item.id !== itemId));
  }

  clearCart() {
    this.cartItems.set([]);
    this.clearLocalStorage();
  }

  clearLocalStorage(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing cart from localStorage:', error);
    }
  }

  private loadFromLocalStorage(): CartItem[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const items = JSON.parse(stored);
        return Array.isArray(items) ? items : [];
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
    return [];
  }

  private saveToLocalStorage(items: CartItem[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }
}
