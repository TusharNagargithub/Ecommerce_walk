import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent {
  productData : undefined | product;
  productMessage: undefined | string;
  dataId: number | undefined;
  constructor(private route:ActivatedRoute,private product: ProductService){

  }

  ngOnInit(): void{
    console.log("Hello");
    let productId = this.route.snapshot.paramMap.get('id');
    if (productId !== null){
    this.dataId = parseInt(productId,10);
    }
    console.warn("Tushar bro");
    productId && this.product.getProduct(productId).subscribe((data)=>{
      console.warn(data);
      this.productData=data;
    });
  }
  
  submit(data:product){
    console.warn(data);
    if(this.productData){
      data.id = this.productData.id;
    }
    this.product.updateProduct(data).subscribe((result)=>{
      if(result){
          this.productMessage = "Product has updated";
      }
    });
    setTimeout(()=>{
      this.productMessage = undefined;
    },3000)
  }
}
