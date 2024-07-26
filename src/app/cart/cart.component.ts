import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  constructor(private productService:ProductService){}
  mycartproduct: product[] | undefined;
  ngOnInit(): void {
    console.log("I am Tushar");
    this.productService.getmycart().subscribe((result: product[]) => {
      this.mycartproduct = result;
    });
  }
  

}
