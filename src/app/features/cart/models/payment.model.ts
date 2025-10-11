import { CartItem } from '../../product/product.model';
import { ShippingDetails } from './shipping.model';

export interface PaymentInfo {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
}

export interface Order {
  items: CartItem[];
  shipping: ShippingDetails;
  payment: PaymentInfo;
  total: number;
  orderId: string;
  createdAt: Date;
}
