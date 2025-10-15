import { Injectable, signal } from '@angular/core';
import { Shipping } from '../../features/cart/models/shipping.model';
import { Payment, Order } from '../../features/cart/models/payment.model';
import { CartItem } from '../../features/cart/models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private Shipping = signal<Shipping | null>(null);
  private paymentInfo = signal<Payment | null>(null);

  readonly shipping = this.Shipping.asReadonly();
  readonly payment = this.paymentInfo.asReadonly();

  saveShipping(details: Shipping) {
    this.Shipping.set(details);
  }

  savePaymentInfo(info: Payment) {
    this.paymentInfo.set(info);
  }

  completeOrder(items: CartItem[], shipping: Shipping, payment: Payment, total: number): Order {
    // Create order object
    const order: Order = {
      orderId: this.generateOrderId(),
      items: items,
      shipping: shipping,
      payment: {
        ...payment,
        // Mask sensitive data for logging
        cardNumber: '****' + payment.cardNumber.slice(-4),
        cvv: '***',
      },
      total: total,
      createdAt: new Date(),
    };

    // Log complete order to console
    this.logOrder(order);

    // TODO: Send order to backend API
    // await this.http.post('/api/orders', order).toPromise();

    return order;
  }

  private logOrder(order: Order): void {
    console.log('========================================');
    console.log('✅ ORDER COMPLETED SUCCESSFULLY');
    console.log('========================================');
    console.log('Order Details:', order);
    console.log('----------------------------------------');
    console.log('Order ID:', order.orderId);
    console.log('Order Date:', order.createdAt.toLocaleString());
    console.log('----------------------------------------');
    console.log('Items:', order.items);
    console.log('Total Items:', order.items.length);
    console.log('----------------------------------------');
    console.log('Shipping Information:', order.shipping);
    console.log('----------------------------------------');
    console.log('Payment Information:', order.payment);
    console.log('----------------------------------------');
    console.log('Total Amount: $', order.total.toFixed(2));
    console.log('========================================');
  }

  private generateOrderId(): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    return `ORD-${timestamp}-${random}`;
  }

  clearCheckout() {
    this.Shipping.set(null);
    this.paymentInfo.set(null);
  }
}
