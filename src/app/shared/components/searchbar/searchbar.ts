import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideSearch } from '@ng-icons/lucide';

@Component({
  selector: 'searchbar',
  templateUrl: './searchbar.html',
  imports: [NgIcon],
  viewProviders: [provideIcons({ lucideSearch })],
})
export class Searchbar {}
