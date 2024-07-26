import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {
  Message: string | undefined;
  
  constructor(private productService:ProductService){ }

  submit(data:product){
    console.warn(data);
    this.productService.addProduct(data);
//    this.Message = this.productService.addMessage;
   
    console.log(this.Message);
  }
  //   console.warn(data);
  //   this.productService.addProduct(data).subscribe((result:any) => {
  //     console.warn(result);
  //   });
}
