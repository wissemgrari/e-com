import { Component, inject, Input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { CartItem } from '../../../product/product.model';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideTrash2 } from '@ng-icons/lucide';
import { CartService } from '../../../../core/services/cart.service';

@Component({
  selector: 'cart-item',
  standalone: true,
  imports: [NgOptimizedImage, NgIcon],
  providers: [provideIcons({ lucideTrash2 })],
  template: `
    <div class="flex items-center justify-between">
      <!--  IMAGE AND DETAILS  -->
      <div class="flex gap-8">
        <!--  IMAGE  -->
        <div class="relative w-32 h-32 bg-gray-50 rounded-lg overflow-hidden">
          <img
            [ngSrc]="cartItem.images[cartItem.selectedColor]"
            [alt]="cartItem.name"
            fill
            class="object-contain"
          />
        </div>
      </div>
      <!--  ITEM DETAILS  -->
      <div class="flex flex-col justify-between">
        <div class="flex flex-col gap-1">
          <p class="text-sm font-medium">{{ cartItem.name }}</p>
          <p class="text-xs text-gray-500">Quantity: {{ cartItem.quantity }}</p>
          <p class="text-xs text-gray-500">Size: {{ cartItem.selectedSize }}</p>
          <p class="text-xs text-gray-500">Color: {{ cartItem.selectedColor }}</p>
        </div>
        <p class="font-medium">{{ '$' + cartItem.price.toFixed(2) }}</p>
      </div>
      <!--  DELETE BUTTON  -->
      <button
        (click)="removeFromCart(cartItem.id)"
        class="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 transition-all duration-300 text-red-400 flex items-center justify-center cursor-pointer"
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
