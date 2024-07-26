import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { cart, product } from '../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})

export class ProductDetailsComponent {
  productData: undefined | product;
  productQuantity:number=1;
  removeCart=false;
  cartData!: cart;
  buy: boolean = false;

  constructor(private activeRoute:ActivatedRoute,private route:Router, private product: ProductService){}
  ngOnInit(): void {
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    console.warn(productId);
    productId && this.product.getProduct(productId).subscribe((result)=>{
      console.warn(result);
      this.productData = result;

      let cartData = localStorage.getItem('localCart');
      if(productId && cartData){
        let items = JSON.parse(cartData)
        items = items.filter((item:product)=>{
          productId == item.id.toString()
        });
        if(items.length){
          this.removeCart = true
        }else{
          this.removeCart = false
        }
      }
      let user = localStorage.getItem('user');
      if(user){
        let userId = user && JSON.parse(user).id;
        this.product.getCartList(userId);
      }    
    });
  }

  handleQuantity(val:string){
    if(this.productQuantity<20 && val==='plus'){
      this.productQuantity+=1;
    }else if(this.productQuantity>1 && val==='min'){
      this.productQuantity-=1;
    }
  }
  removeToCart(ProductId:number){
   this.product.removeItemFromCart(ProductId);
   this.removeCart = false
  }

  addToCart(){
    if(this.productData){
      let user = localStorage.getItem('user');
       let userId = user && JSON.parse(user).id;
      this.productData.quantity = this.productQuantity;
      if(!localStorage.getItem('user')){
          this.product.localAddToCart(this.productData);
          this.removeCart=true;
          console.warn("User is not logged In");
      }else{
       console.warn("User is logged In");
       
       console.warn(userId);
       let cartData : cart = {
        ...this.productData,
        userId,
        productId: this.productData.id,
       }
       this.cartData = cartData;
       console.log(cartData);
      }
      // delete this.cartData;
      //delete cartData.id;
      console.warn(this.cartData);
      console.warn(this.productData);
      this.product.addTocart(this.cartData,userId);
    }
  }
  buy1(){
    this.buy = true;
  }
}
