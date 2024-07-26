import { Component } from '@angular/core';
import { cart, product, SignUp } from '../data-type';
import { UserService } from '../services/user.service';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { login } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {
  showlogin:boolean=true;
  authError:string="";
  constructor(private user:UserService, private product:ProductService){}

  ngOnInit(): void{
      this.user.userAuthreload(); 
  }
  signUp(data:SignUp){
    console.warn(data);
    this.user.userSignUp(data);
  }
  login(data:login){
    console.log(data);
    this.user.userLogin(data);
    this.user.invalidUserAuth.subscribe((result)=>{
      console.warn("apple",result);
      if(result){
        this.authError="Please enter valid user details";
      }else{
        this.localCartToRemoteCart()
      }
    })
  }
  openSignup(){
    this.showlogin=false;
  }
  openLogin(){
    this.showlogin=true;
  }
  localCartToRemoteCart(){
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;

    if(data){
      let cardDataList:product[] = JSON.parse(data);
     
      cardDataList.forEach((product: product,index) => {
        let cartData :cart ={
          ...product,
          productId:product.id,
          userId,
        }
        delete cartData.id;
        setTimeout(()=>{
          this.product.addTocart(cartData,1);
          if(cardDataList.length === index+1){
            localStorage.removeItem('localCart');
          }
        },500)
        
      });
    }
    setTimeout(()=>{
      this.product.getCartList(userId);
    },2000)
    

  }
}
