import { Component, signal } from '@angular/core';
import { CartList } from './components/cart-list/cart-list.component';
import { CartSummary } from './components/cart-summary/cart-summary.component';
import { PaymentForm } from './components/payment-form/payment-form.component';
import { ShippingForm } from './components/shipping-form/shipping-form.component';

@Component({
  selector: 'cart',
  standalone: true,
  imports: [CartList, ShippingForm, PaymentForm, CartSummary],
  templateUrl: './cart.component.html',
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

    return `w-6 h-6 text-xs lg:w-8 lg:h-8 lg:text-base rounded-full flex items-center justify-center ${
      isActive
        ? 'bg-gray-800 text-white'
        : isCompleted
        ? 'bg-green-600 text-white'
        : 'bg-gray-400 text-white'
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
