import { Component, computed, inject, input, output } from '@angular/core';
import { CartService } from '../../../../core/services/cart.service';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowRight } from '@ng-icons/lucide';

@Component({
  selector: 'cart-summary',
  standalone: true,
  imports: [NgIcon],
  viewProviders: [provideIcons({ lucideArrowRight })],
  template: `
    <div class="w-full shadow-lg border-1 border-gray-100 p-8 rounded-lg flex flex-col gap-8">
      <h2 class="font-semibold text-lg">Order Summary</h2>

      <div class="space-y-5">
        <div class="flex justify-between text-gray-500 text-sm">
          <span>Subtotal ({{ itemCount() }} items)</span>
          <span class="text-gray-800 font-medium">{{ '$' + subtotal() }}</span>
        </div>

        <div class="flex justify-between text-gray-500 text-sm">
          <span>Shipping</span>
          <span class="text-gray-800 font-medium">{{ '$' + shippingCost().toFixed(2) }}</span>
        </div>

        <div class="flex justify-between text-gray-500 text-sm">
          <span>Tax</span>
          <span class="text-gray-800 font-medium">{{ '$' + tax().toFixed(2) }}</span>
        </div>

        <div class="border-t border-gray-200 pt-3 mt-3">
          <div class="flex justify-between font-bold">
            <span class="text-gray-800">Total</span>
            <span>{{ '$' + total().toFixed(2) }}</span>
          </div>
        </div>
      </div>

      @if (currentStep() === 1) {
      <button
        (click)="continue.emit()"
        [disabled]="itemCount() === 0"
        [class.opacity-50]="itemCount() === 0"
        [class.cursor-not-allowed]="itemCount() === 0"
        class="w-full bg-gray-800 hover:bg-gray-900 disabled:hover:bg-gray-800 transition-all duration-300 text-white p-3 rounded-lg flex items-center justify-center gap-2 cursor-pointer"
      >
        <span>Proceed to Shipping</span>
        <ng-icon name="lucideArrowRight" />
      </button>
      } @if (itemCount() === 0) {
      <p class="text-center text-sm text-gray-500 mt-3">Add items to your cart to checkout</p>
      }
    </div>
  `,
})
export class CartSummary {
  private cartService = inject(CartService);

  currentStep = input.required<number>();
  continue = output<void>();

  itemCount = this.cartService.itemCount;

  // Calculate subtotal
  subtotal = computed(() =>
    this.cartService.items().reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  // Calculate shipping (free over $100, else $10)
  shippingCost = computed(() => (this.subtotal() > 100 ? 0 : 10));

  // Calculate tax (10%)
  tax = computed(() => this.subtotal() * 0.1);

  // Calculate total
  total = computed(() => this.subtotal() + this.shippingCost() + this.tax());
}
