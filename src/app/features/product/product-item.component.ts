import { Component, Input, signal } from '@angular/core';
import {NgOptimizedImage, NgStyle} from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideShoppingCart } from '@ng-icons/lucide';
import { CartItem, Product, ProductSelection } from './product.model';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'product-item',
  imports: [NgStyle, NgIcon, NgOptimizedImage],
  templateUrl: './product-item.component.html',
  viewProviders: [provideIcons({ lucideShoppingCart })],
})
export class ProductItem {
  @Input({ required: true }) product!: Product;

  // Signal for product selection state
  productSelection = signal<ProductSelection>({
    size: '',
    color: '',
  });

  constructor(private cartService: CartService) {}

  ngOnInit() {
    // Initialize with first size and color
    this.productSelection.set({
      size: this.product.sizes[0],
      color: this.product.colors[0],
    });
  }

  handleProductType(type: 'size' | 'color', value: string) {
    this.productSelection.update((prev) => ({
      ...prev,
      [type]: value,
    }));
  }

  handleProductTypeFromEvent(type: 'size' | 'color', event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.handleProductType(type, value);
  }

  handleAddToCart() {
    const cartItem: CartItem = {
      ...this.product,
      quantity: 1,
      selectedSize: this.productSelection().size,
      selectedColor: this.productSelection().color,
    };

    this.cartService.addToCart(cartItem);

    // Optional: Show toast notification (install ngx-toastr)
    // this.toastr.success('Product added to cart');
    console.log('Product added to cart:', cartItem);
  }
}
