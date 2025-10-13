import { Component, inject, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowLeft, lucideArrowRight } from '@ng-icons/lucide';

@Component({
  selector: 'shipping-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIcon],
  viewProviders: [provideIcons({ lucideArrowLeft, lucideArrowRight })],
  template: `
    <div class="w-full shadow-lg border border-gray-100 p-4 lg:p-8 rounded-lg">
      <form [formGroup]="shippingForm" (ngSubmit)="onSubmit()" class="space-y-5">
        <!-- Name -->
        <div>
          <label class="text-xs font-medium text-gray-500">Name</label>
          <input
            type="text"
            formControlName="name"
            class="w-full py-2 border-b border-gray-200 outline-none text-sm placeholder:text-gray-400"
            placeholder="John Doe"
          />
          @if (shippingForm.get('name')?.invalid && shippingForm.get('name')?.touched) {
          <p class="text-red-500 text-xs mt-1">Name is required</p>
          }
        </div>

        <!-- Email -->
        <div>
          <label class="text-xs font-medium text-gray-500">Email</label>
          <input
            type="email"
            formControlName="email"
            class="w-full p-1 border-b border-gray-200 outline-none text-sm placeholder:text-gray-400"
            placeholder="john@example.com"
          />
          @if (shippingForm.get('email')?.invalid && shippingForm.get('email')?.touched) {
          <p class="text-red-500 text-xs mt-1">Valid email is required</p>
          }
        </div>

        <!-- Phone -->
        <div>
          <label class="text-xs font-medium text-gray-500">Phone</label>
          <input
            type="tel"
            formControlName="phone"
            class="w-full p-1 border-b border-gray-200 outline-none text-sm placeholder:text-gray-400"
            placeholder="+1 (555) 123-4567"
          />
          @if (shippingForm.get('phone')?.invalid && shippingForm.get('phone')?.touched) {
          <p class="text-red-500 text-xs mt-1">Phone number is required</p>
          }
        </div>

        <!-- Address -->
        <div>
          <label class="text-xs font-medium text-gray-500">Address</label>
          <input
            type="text"
            formControlName="address"
            class="w-full p-1 border-b border-gray-200 outline-none text-sm placeholder:text-gray-400"
            placeholder="123 Main St"
          />
          @if (shippingForm.get('address')?.invalid && shippingForm.get('address')?.touched) {
          <p class="text-red-500 text-xs mt-1">Address is required</p>
          }
        </div>

        <!-- City, State, Zip -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="text-xs font-medium text-gray-500">City</label>
            <input
              type="text"
              formControlName="city"
              class="w-full p-1 border-b border-gray-200 outline-none text-sm placeholder:text-gray-400"
              placeholder="New York"
            />
            @if (shippingForm.get('city')?.invalid && shippingForm.get('city')?.touched) {
            <p class="text-red-500 text-xs mt-1">Required</p>
            }
          </div>

          <div>
            <label class="text-xs font-medium text-gray-500">State</label>
            <input
              type="text"
              formControlName="state"
              class="w-full p-1 border-b border-gray-200 outline-none text-sm placeholder:text-gray-400"
              placeholder="NY"
            />
            @if (shippingForm.get('state')?.invalid && shippingForm.get('state')?.touched) {
            <p class="text-red-500 text-xs mt-1">Required</p>
            }
          </div>

          <div>
            <label class="text-xs font-medium text-gray-500">Zip Code</label>
            <input
              type="text"
              formControlName="zipCode"
              class="w-full p-1 border-b border-gray-200 outline-none text-sm placeholder:text-gray-400"
              placeholder="10001"
            />
            @if (shippingForm.get('zipCode')?.invalid && shippingForm.get('zipCode')?.touched) {
            <p class="text-red-500 text-xs mt-1">Required</p>
            }
          </div>
        </div>

        <!-- Country -->
        <div>
          <label class="text-xs font-medium text-gray-500">Country</label>
          <input
            type="text"
            formControlName="country"
            class="w-full p-1 border-b border-gray-200 outline-none text-sm placeholder:text-gray-400"
            placeholder="United States"
          />
          @if (shippingForm.get('country')?.invalid && shippingForm.get('country')?.touched) {
          <p class="text-red-500 text-xs mt-1">Country is required</p>
          }
        </div>

        <!-- Buttons -->
        <div class="flex gap-4 pt-4">
          <button
            type="button"
            (click)="back.emit()"
            class="flex-1 bg-gray-200 hover:bg-gray-300 transition-all duration-300 text-gray-800 p-3 rounded-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <ng-icon name="lucideArrowLeft" />
            <span>Back to Cart</span>
          </button>

          <button
            type="submit"
            [disabled]="shippingForm.invalid"
            [class.opacity-50]="shippingForm.invalid"
            [class.cursor-not-allowed]="shippingForm.invalid"
            class="flex-1 bg-gray-800 hover:bg-gray-900 disabled:hover:bg-gray-800 transition-all duration-300 text-white p-3 rounded-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Continue to Payment</span>
            <ng-icon name="lucideArrowRight" />
          </button>
        </div>
      </form>
    </div>
  `,
})
export class ShippingForm {
  private fb = inject(FormBuilder);

  next = output<any>();
  back = output<void>();

  shippingForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    address: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    zipCode: ['', Validators.required],
    country: ['', Validators.required],
  });

  onSubmit() {
    if (this.shippingForm.valid) {
      this.next.emit(this.shippingForm.value);
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.shippingForm.controls).forEach((key) => {
        this.shippingForm.get(key)?.markAsTouched();
      });
    }
  }
}
