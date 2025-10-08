import { Component, inject } from '@angular/core';
import { ToastService } from './toast.service';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideCheck,
  lucideInfo,
  lucideOctagonX,
  lucideTriangleAlert,
  lucideX,
} from '@ng-icons/lucide';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [NgIcon],
  viewProviders: [
    provideIcons({ lucideX, lucideCheck, lucideOctagonX, lucideInfo, lucideTriangleAlert }),
  ],
  template: `
    <div class="fixed bottom-4 right-4 z-50 space-y-2">
      @for (toast of toastService.toasts$(); track toast.id) {
      <div
        [class]="getToastClasses(toast.type)"
        class="min-w-[300px] p-2 rounded-lg shadow-lg animate-slide-in"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-1">
            <ng-icon [name]="getToastIcon(toast.type)" class="-mb-0.5" />
            <span class="capitalize font-medium text-sm">{{ toast.type }}</span>
          </div>
          <button
            class="rounded-full h-5 w-5 hover:backdrop-opacity-100 transition duration-150 cursor-pointer"
            (click)="toastService.remove(toast.id)"
          >
            <ng-icon name="lucideX" />
          </button>
        </div>
        <span class="ml-5 text-sm font-medium text-black/70">{{ toast.message }}</span>
      </div>
      }
    </div>
  `,
  styles: [
    `
      @keyframes slide-in {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }

      .animate-slide-in {
        animation: slide-in 0.3s ease-out;
      }
    `,
  ],
})
export class ToastComponent {
  toastService = inject(ToastService);

  getToastClasses(type: string): string {
    const baseClasses = {
      success: 'text-green-700',
      error: 'text-red-700',
      info: 'text-blue-700',
      warning: 'text-yellow-700',
    };
    const typeClasses = {
      success: 'bg-green-200/70 ring ring-green-300 backdrop-blur-xs',
      error: 'bg-red-200/70 ring ring-red-300 backdrop-blur-xs',
      info: 'bg-blue-200/70 ring ring-blue-300 backdrop-blur-xs',
      warning: 'bg-yellow-200/70 ring ring-yellow-300 backdrop-blur-xs',
    };
    return `${baseClasses[type as keyof typeof typeClasses]} ${
      typeClasses[type as keyof typeof typeClasses]
    }`;
  }

  getToastIcon(type: string): string {
    const icons = {
      success: 'lucideCheck',
      error: 'lucideOctagonX',
      info: 'lucideInfo',
      warning: 'lucideTriangleAlert',
    };
    return `${icons[type as keyof typeof icons]}}`;
  }
}
