import { Component, signal } from '@angular/core';
import { CartList } from './components/cart-list/cart-list.component';
import { CartSummary } from './components/cart-summary/cart-summary.component';
import { PaymentForm } from './components/payment-form/payment-form.component';
import { ShippingForm } from './components/shipping-form/shipping-form.component';

@Component({
  selector: 'cart',
  standalone: true,
  imports: [CartList, ShippingForm, PaymentForm, CartSummary],
  template: `
    <div>
      <h1 class="text-2xl font-semibold text-center mb-10">Your Shopping Cart</h1>
      <!-- Step Indicator -->
      <div class="flex items-center justify-center mb-8">
        <div class="flex items-center">
          <div class="flex items-center gap-x-2">
            <div [class]="getStepClass(1)">1</div>
            <p class="text-lg font-medium">Cart</p>
          </div>
          <div class="w-20 h-0.5 bg-gray-300 mx-2"></div>
          <div class="flex items-center gap-x-2">
            <div [class]="getStepClass(2)">2</div>
            <p class="text-lg font-medium">Shipping</p>
          </div>
          <div class="w-20 h-0.5 bg-gray-300 mx-2"></div>
          <div class="flex items-center gap-x-2">
            <div [class]="getStepClass(3)">3</div>
            <p class="text-lg font-medium">Payment</p>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2">
          @switch (currentStep()) { @case (1) {
          <cart-list (next)="goToStep(2)" />
          } @case (2) {
          <shipping-form (next)="handleShippingSubmit($event)" (back)="goToStep(1)" />
          } @case (3) {
          <payment-form (submit)="handlePaymentSubmit($event)" (back)="goToStep(2)" />
          } }
        </div>
        <!-- Sidebar Summary -->
        <div class="lg:col-span-1">
          <cart-summary />
        </div>
      </div>
    </div>
  `,
})
export class Cart {
  currentStep = signal(1);

  goToStep(step: number) {
    this.currentStep.set(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getStepClass(step: number): string {
    const isActive = this.currentStep() === step;
    const isCompleted = this.currentStep() > step;

    return `w-9 h-9 rounded-full flex items-center justify-center ${
      isActive
        ? 'bg-gray-800 text-white'
        : isCompleted
        ? 'bg-green-600 text-white'
        : 'bg-gray-300 text-gray-600'
    }`;
  }

  handleShippingSubmit(shippingData: any) {
    console.log('Shipping data:', shippingData);
    this.goToStep(3);
  }

  handlePaymentSubmit(paymentData: any) {
    console.log('Payment data:', paymentData);
    // Process order
  }
}
