import { Injectable, signal } from '@angular/core';
import { Toast } from './toast.model';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toasts = signal<Toast[]>([]);
  readonly toasts$ = this.toasts.asReadonly();

  show(type: Toast['type'], message: string, duration = 3000) {
    const id = Math.random().toString(36).substring(7);
    const toast: Toast = { id, type, message };

    this.toasts.update((toasts) => [...toasts, toast]);

    // Auto-remove after duration
    setTimeout(() => this.remove(id), duration);
  }

  success(message: string, duration?: number) {
    this.show('success', message, duration);
  }

  error(message: string, duration?: number) {
    this.show('error', message, duration);
  }

  info(message: string, duration?: number) {
    this.show('info', message, duration);
  }

  warning(message: string, duration?: number) {
    this.show('warning', message, duration);
  }

  remove(id: string) {
    this.toasts.update((toasts) => toasts.filter((t) => t.id !== id));
  }
}
