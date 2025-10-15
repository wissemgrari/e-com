import { CartItem } from './cart.model';
import { Shipping } from './shipping.model';

export interface Payment {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
}

export interface Order {
  items: CartItem[];
  shipping: Shipping;
  payment: Payment;
  total: number;
  orderId: string;
  createdAt: Date;
}
