import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideHouse, lucideBell, lucideShoppingCart } from '@ng-icons/lucide';
import { Searchbar } from "../searchbar/searchbar";

@Component({
  selector: 'navbar',
  templateUrl: './navbar.html',
  imports: [NgIcon, Searchbar],
  viewProviders: [provideIcons({ lucideHouse, lucideBell, lucideShoppingCart })],
})
export class Navbar {}
