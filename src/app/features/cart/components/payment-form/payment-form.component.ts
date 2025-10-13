import { Component, inject, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowLeft, lucideShoppingBag } from '@ng-icons/lucide';

@Component({
  selector: 'payment-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIcon],
  viewProviders: [provideIcons({ lucideArrowLeft, lucideShoppingBag })],
  template: `
    <div class="w-full shadow-lg border border-gray-100 p-4 lg:p-8 rounded-lg">
      <form [formGroup]="paymentForm" (ngSubmit)="onSubmit()" class="space-y-5">
        <!-- Card Number -->
        <div>
          <label class="text-xs font-medium text-gray-500">Card Number</label>
          <input
            type="text"
            formControlName="cardNumber"
            maxlength="19"
            class="w-full py-2 border-b border-gray-200 outline-none text-sm placeholder:text-gray-400"
            placeholder="1234 5678 9012 3456"
          />
          @if (paymentForm.get('cardNumber')?.invalid && paymentForm.get('cardNumber')?.touched) {
          <p class="text-red-500 text-xs mt-1">Valid card number is required (16 digits)</p>
          }
        </div>

        <!-- Cardholder Name -->
        <div>
          <label class="text-xs font-medium text-gray-500">Cardholder Name</label>
          <input
            type="text"
            formControlName="cardholderName"
            class="w-full py-2 border-b border-gray-200 outline-none text-sm placeholder:text-gray-400"
            placeholder="John Doe"
          />
          @if (paymentForm.get('cardholderName')?.invalid &&
          paymentForm.get('cardholderName')?.touched) {
          <p class="text-red-500 text-xs mt-1">Cardholder name is required</p>
          }
        </div>

        <!-- Expiry Date and CVV -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="text-xs font-medium text-gray-500">Expiry Date</label>
            <input
              type="text"
              formControlName="expiryDate"
              maxlength="5"
              class="w-full py-2 border-b border-gray-200 outline-none text-sm placeholder:text-gray-400"
              placeholder="MM/YY"
            />
            @if (paymentForm.get('expiryDate')?.invalid && paymentForm.get('expiryDate')?.touched) {
            <p class="text-red-500 text-xs mt-1">Valid expiry date required (MM/YY)</p>
            }
          </div>

          <div>
            <label class="text-xs font-medium text-gray-500">CVV</label>
            <input
              type="text"
              formControlName="cvv"
              maxlength="4"
              class="w-full py-2 border-b border-gray-200 outline-none text-sm placeholder:text-gray-400"
              placeholder="123"
            />
            @if (paymentForm.get('cvv')?.invalid && paymentForm.get('cvv')?.touched) {
            <p class="text-red-500 text-xs mt-1">CVV is required (3-4 digits)</p>
            }
          </div>
        </div>
        <!-- Buttons -->
        <div class="flex gap-4 pt-4">
          <button
            type="button"
            (click)="back.emit()"
            class="flex-1 bg-gray-200 hover:bg-gray-300 transition-all duration-300 text-gray-800 p-3 rounded-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <ng-icon name="lucideArrowLeft" />
            <span>Back to Shipping</span>
          </button>

          <button
            type="submit"
            [disabled]="paymentForm.invalid"
            [class.opacity-50]="paymentForm.invalid"
            [class.cursor-not-allowed]="paymentForm.invalid"
            class="flex-1 bg-green-600 hover:bg-green-700 disabled:hover:bg-green-600 transition-all duration-300 text-white p-3 rounded-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <ng-icon name="lucideShoppingBag" />
            <span>Complete Order</span>
          </button>
        </div>
      </form>
    </div>
  `,
})
export class PaymentForm {
  private fb = inject(FormBuilder);

  submit = output<any>();
  back = output<void>();

  paymentForm: FormGroup = this.fb.group({
    cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
    cardholderName: ['', Validators.required],
    expiryDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
    cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
  });

  onSubmit() {
    if (this.paymentForm.valid) {
      this.submit.emit(this.paymentForm.value);
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.paymentForm.controls).forEach((key) => {
        this.paymentForm.get(key)?.markAsTouched();
      });
    }
  }
}
