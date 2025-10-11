import { Injectable, signal, computed } from '@angular/core';
import { CartItem } from '../../features/product/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems = signal<CartItem[]>([]);

  // Read-only computed values
  readonly items = this.cartItems.asReadonly();
  readonly itemCount = computed(() => this.cartItems().length);
  readonly total = computed(() =>
    this.cartItems().reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  addToCart(item: CartItem) {
    this.cartItems.update((items) => [...items, item]);
  }

  removeFromCart(itemId: string | number) {
    this.cartItems.update((items) => items.filter((item) => item.id !== itemId));
  }

  clearCart() {
    this.cartItems.set([]);
  }
}
