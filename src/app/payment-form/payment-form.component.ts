import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent {
  num1:number=0;
  price: any;
  flag:boolean=false;
  flag1:boolean=false;
  flag1Limit:number=0;
  constructor(private activeRoute:ActivatedRoute,private route:Router,private snackBar: MatSnackBar){
    console.warn("in constructor");
    let productId = this.activeRoute.snapshot.paramMap.get('price');
    this.price = productId;
  }
 
  
  ngOnit() {
    console.warn("working");
    let productId = this.activeRoute.snapshot.paramMap.get('price');
    if(productId){
      this.price="Ok"
    }
    console.log(productId);
  }
  num(){
    this.snackBar.open('Payment is succesfully done', 'Close', { duration: 3000 });

  }
  Showdone(){
    // this.snackBar.open('Payment is succesfully done', 'Close', { duration: 3000 });
    // alert("Ok your payment is succesfully done");
  }
  checkSubmit(payment:any){
    console.warn(payment.value);
    console.warn(payment.value.cardname);
    if(payment.value.cardnumber!=="" && payment.value.cardname!=="" && payment.value.expirydate!=="" && payment.value.cvvv!==""){
      this.snackBar.open('Payment is succesfully done', 'Close', { duration: 3000 });
  }
    else{
      this.snackBar.open('Payment is not succesfully done', 'Close', { duration: 5000 });
    }
  }
}
