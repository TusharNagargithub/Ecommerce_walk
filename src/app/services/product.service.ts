import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { cart, product } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cartData = new EventEmitter<product[] | []>();
  userId!: number;
  addMessage : string|undefined;
  id: string | undefined;
  limit: number =10;

  constructor(private http:HttpClient,private snackBar: MatSnackBar) { }
  addProduct(data:product) {
    this.http.post("http://localhost:3000/products"
      ,data
      ,{observe:'response'}
    ).subscribe((result)=>{
      this.addMessage = "Product is sucessfully added";
      console.warn("Ok data is Posted in products");
      //setTimeout(()=>this.addMessage=undefined,3000)
    });
  }
  productList(){
    return this.http.get<product[]>("http://localhost:3000/products");
  }

  deleteProduct(id:number){
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }

  getProduct(id:string){
    return this.http.get<product>(`http://localhost:3000/products/${id}`);
  }

  updateProduct(product:product){
    console.log(product);
    return this.http.put<product>(`http://localhost:3000/products/${product.id}`,product);
  }

  popularProducts(){
    return this.http.get<product[]>("http://localhost:3000/products?_limit=3");
  }

  trendyProducts(limit:number){
    return this.http.get<product[]>(`http://localhost:3000/products?_limit=${limit}`);
  }

  localAddToCart(data:product){
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if(!localCart){
      localStorage.setItem('localCart',JSON.stringify([data]));
      this.cartData.emit([data]);
    }else{
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart',JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }
    this.cartData.emit(cartData);
  }

  removeItemFromCart(productId:number){
    let cartData = localStorage.getItem('localCart');
    if(cartData){
      let items:product[] = JSON.parse(cartData);
      
      items = items.filter((item:product)=>productId !== item.id)
      console.log(items.length);
    }
  }

  addTocart(cartData:cart,userId:number){
    this.http.post("http://localhost:3000/cart",cartData,{observe:'response'}).subscribe((result)=>{
      if(result){
      // alert("Product is added");// Here add our model
      this.snackBar.open('Product is added to your cart!', 'Close', { duration: 3000 });

      this.getCartList(userId);
      }
    })
  }

  getmycart(){
    return this.http.get<product[]>('http://localhost:3000/cart');
  }

  getCartList(userId:number){
    this.http.get<product[]>('http://localhost:3000/cart?userId='+userId,
      {observe:'response'}
    ).subscribe((result)=>{
      console.warn(result);
      if(result && result.body){
        this.cartData.emit(result.body);
      }
    });
  }

  searchProducts(query:string){
    return this.http.get<product[]>(`http://localhost:3000/products?q=${query}`);
  }
}
