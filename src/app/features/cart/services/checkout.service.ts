import { Injectable, signal } from '@angular/core';
import { ShippingDetails } from '../models/shipping.model';
import { PaymentInfo, Order } from '../models/payment.model';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private shippingDetails = signal<ShippingDetails | null>(null);
  private paymentInfo = signal<PaymentInfo | null>(null);

  readonly shipping = this.shippingDetails.asReadonly();
  readonly payment = this.paymentInfo.asReadonly();

  saveShippingDetails(details: ShippingDetails) {
    this.shippingDetails.set(details);
  }

  savePaymentInfo(info: PaymentInfo) {
    this.paymentInfo.set(info);
  }

  async createOrder(cartItems: any[]): Promise<Order> {
    // API call to create order
    const order: Order = {
      items: cartItems,
      shipping: this.shippingDetails()!,
      payment: this.paymentInfo()!,
      total: this.calculateTotal(cartItems),
      orderId: this.generateOrderId(),
      createdAt: new Date(),
    };

    // TODO: Send to backend
    return order;
  }

  private calculateTotal(items: any[]): number {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  private generateOrderId(): string {
    return 'ORD-' + Date.now();
  }

  clearCheckout() {
    this.shippingDetails.set(null);
    this.paymentInfo.set(null);
  }
}
