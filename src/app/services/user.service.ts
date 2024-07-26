import { EventEmitter, Injectable } from '@angular/core';
import { login, SignUp } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  invalidUserAuth = new EventEmitter<boolean>(false);

  constructor(private http: HttpClient, private route: Router) { }
  userSignUp(user:SignUp){                            //check response with body
    this.http.post("http://localhost:3000/users",user,{observe:'response'})
    .subscribe((result)=>{
      if(result){
        localStorage.setItem('user',JSON.stringify(result.body));
        this.route.navigate(['/']);
      }
    })
  }
 
  userLogin(data:login){  // here observer they can be observe all response
    console.log("Tushar");
    this.http.get<SignUp[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,
      {observe:'response'}
    )
    .subscribe((result)=>{
      if(result && result.body?.length){
        console.warn(result);
        this.invalidUserAuth.emit(false);
        localStorage.setItem('user',JSON.stringify(result.body[0]));
        this.route.navigate(['/']);
      }
      else{
        this.invalidUserAuth.emit(true);
      }
    })
  }
  userAuthreload(){
    if(localStorage.getItem('user')){
      this.route.navigate(['/']);
    }
  }
}
