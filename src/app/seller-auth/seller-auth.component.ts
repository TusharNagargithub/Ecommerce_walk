import { Component } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { SignUp } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent {
  constructor(private seller:SellerService, private router:Router){}
  showLogin=false;
  authError:string = '';
  ngOnInit():void{
    this.seller.reloadSeller()
  } 
  
  signUp(data:SignUp): void{
    this.seller.userSignUp(data);
  }

  openLogin(){
    this.showLogin=true;
  }
  openSignUp(){
    this.showLogin=false;
  }
  login(data:SignUp): void{
    this.authError="";
    console.warn(data);
    this.seller.userLogin(data);
    this.seller.isLoginError.subscribe((isError)=>{
      if(isError){
          this.authError="Email or password is not correct";
      }
     })
  }
  
}