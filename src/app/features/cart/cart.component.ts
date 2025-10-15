import { Component, inject, signal } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { CheckoutService } from '../../core/services/checkout.service';
import { ToastService } from '../../shared/components/toast/toast.service';
import { CartList } from './components/cart-list/cart-list.component';
import { CartSummary } from './components/cart-summary/cart-summary.component';
import { PaymentForm } from './components/payment-form/payment-form.component';
import { ShippingForm } from './components/shipping-form/shipping-form.component';
import { Payment } from './models/payment.model';
import { Shipping } from './models/shipping.model';

@Component({
  selector: 'cart',
  standalone: true,
  imports: [CartList, ShippingForm, PaymentForm, CartSummary],
  templateUrl: './cart.component.html',
})
export class Cart {
  private cartService = inject(CartService);
  private checkoutService = inject(CheckoutService);
  private toast = inject(ToastService);

  currentStep = signal(1);
  shippingData = signal<Shipping | null>(null);
  paymentData = signal<Payment | null>(null);
  isProcessingOrder = signal(false); // Prevent duplicate submissions

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

  handleShippingSubmit(shippingData: Shipping) {
    this.shippingData.set(shippingData);
    this.goToStep(3);
  }

  handlePaymentSubmit(paymentData: Payment) {
    // Prevent duplicate submissions
    if (this.isProcessingOrder()) {
      return;
    }

    this.paymentData.set(paymentData);

    const shipping = this.shippingData();
    const items = this.cartService.items();
    const totalPrice = this.cartService.totalPrice();

    if (!shipping) {
      this.toast.error('Missing shipping data');
      return;
    }

    // Mark as processing
    this.isProcessingOrder.set(true);

    try {
      // Use checkout service to complete the order
      const order = this.checkoutService.completeOrder(items, shipping, paymentData, totalPrice);

      // Clear cart and localStorage after successful order
      this.cartService.clearCart();

      this.toast.success('Order completed successfully!');

      // Optionally: Navigate to order success page
      // this.router.navigate(['/order-success', order.orderId]);
    } catch (error) {
      this.toast.error('Failed to complete order. Please try again.');
      console.error('Order error:', error);
    } finally {
      // Reset processing flag after a short delay
      setTimeout(() => this.isProcessingOrder.set(false), 300);
    }
  }
}
