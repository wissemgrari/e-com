import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideSearch } from '@ng-icons/lucide';

@Component({
  selector: 'searchbar',
  imports: [NgIcon],
  viewProviders: [provideIcons({ lucideSearch })],
  template: `
    <div
      class="hidden sm:flex items-center gap-2 rounded-full ring-1 ring-gray-200 px-3 py-1 shadow-md"
    >
      <ng-icon name="lucideSearch" size="1rem" color="#4a5565" />
      <input
        id="search"
        placeholder="Search..."
        class="text-sm outline-0 placeholder:text-gray-400"
      />
    </div>
  `,
})
export class Searchbar {}
