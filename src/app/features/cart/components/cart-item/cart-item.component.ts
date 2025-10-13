import { Component, inject, Input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideTrash2 } from '@ng-icons/lucide';
import { CartService } from '../../../../core/services/cart.service';
import { CartItem } from '../../models/cart.model';

@Component({
  selector: 'cart-item',
  standalone: true,
  imports: [NgOptimizedImage, NgIcon],
  providers: [provideIcons({ lucideTrash2 })],
  template: `
    <div class="flex items-start gap-2 lg:gap-5">
      <!--  IMAGE  -->
      <div
        class="flex-1 relative w-24 h-24 lg:w-32 lg:h-32 bg-gray-50 rounded-lg shadow overflow-hidden"
      >
        <img
          [ngSrc]="cartItem.images[cartItem.selectedColor]"
          [alt]="cartItem.name"
          fill
          class="object-contain"
        />
      </div>
      <!--  ITEM DETAILS  -->
      <div class="flex-3 flex flex-col justify-between">
        <div class="flex flex-col gap-1">
          <p class="text-sm font-medium truncate max-w-[10rem]">
            {{ cartItem.name }}
          </p>
          <p class="text-xs text-gray-500">Quantity: {{ cartItem.quantity }}</p>
          <p class="text-xs text-gray-500">Size: {{ cartItem.selectedSize }}</p>
          <p class="text-xs text-gray-500">Color: {{ cartItem.selectedColor }}</p>
        </div>
        <p class="font-medium">{{ '$' + cartItem.price.toFixed(2) }}</p>
      </div>
      <!--  DELETE BUTTON  -->
      <button
        class="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 transition-all duration-300 text-red-400 flex items-center justify-center cursor-pointer"
        (click)="removeFromCart(cartItem.id)"
      >
        <ng-icon name="lucideTrash2" class="w-3 h-3" />
      </button>
    </div>
  `,
})
export class CartItemComponent {
  cartService = inject(CartService);
  @Input() cartItem!: CartItem;

  removeFromCart(id: string | number) {
    this.cartService.removeFromCart(id);
  }
}
