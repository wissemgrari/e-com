import { Component } from '@angular/core';

@Component({
  selector: 'product-item',
  imports: [],
  template: `
    <div class="shadow-lg rounded-lg overflow-hidden">
      <a href="#">
        <div className="relative aspect-[2/3]">
          <img
            src="#"
            alt="#"
            className="fill object-cover hover:scale-105 transition-all duration-300"
          />
        </div>
      </a>
    </div>
  `,
})
export class ProductItem {}
