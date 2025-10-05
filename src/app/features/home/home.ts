import { Component } from '@angular/core';
import { ProductList } from "../../shared/components/product-list/product-list";

@Component({
  selector: 'home',
  imports: [ProductList],
  templateUrl: './home.html',
})
export class Home {}
