import { Component, inject } from '@angular/core';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { CartService } from '../../../../core/services/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'cart-list',
  standalone: true,
  imports: [CartItemComponent, RouterLink],
  template: `
    <div
      class="w-full h-full shadow-lg border border-gray-100 p-4 lg:p-8 rounded-lg flex flex-col gap-8"
    >
      @if (cartItems().length > 0) { @for (item of cartItems(); track item.id) {
      <cart-item [cartItem]="item" />
      } } @else {
      <div class="text-center py-12">
        <p class="text-gray-500 text-lg mb-4">Your cart is empty</p>
        <a routerLink="/" class="text-blue-600 hover:underline">Continue Shopping</a>
      </div>
      }
    </div>
  `,
})
export class CartList {
  private cartService = inject(CartService);

  cartItems = this.cartService.items;
}
