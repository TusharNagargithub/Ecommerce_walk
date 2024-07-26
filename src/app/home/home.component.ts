import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  // images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  popularProducts: undefined | product[];
  productimagefront: string[] =[];
  trendyProducts: undefined | product[];
  limit: number=5;
  message: string="";
  idd: string="343c";
  ProductData: product | any;
  
  
  newImages: string[] = ['https://images-eu.ssl-images-amazon.com/images/G/31/OHL/24/BAU/feb/PC_hero_1_2x_1._CB582889946_.jpg',
     'https://images-eu.ssl-images-amazon.com/images/G/31/IMG24/Smart_Watches/MED_MAY/Tall_Hero_1500X600_BAU_NewLaunches._CB554931622_.jpg', 
     'https://images-eu.ssl-images-amazon.com/images/G/31/INSLGW/pc_unrec_refresh._CB555261616_.jpg'];
  constructor(private product:ProductService,private http:HttpClient){}
 

  ngOnInit(): void{
    this.product.popularProducts().subscribe((data)=>{
      console.warn(data);
      this.popularProducts = data;
    })

    
    this.product.trendyProducts(this.limit).subscribe((data)=>{
      this.trendyProducts = data;
    });
  
  }
  addCart(id:any){
    console.log(id);
    this.http.get(`http://localhost:3000/products?id=${id}`).subscribe((result)=>{
      console.log("Tushar");
      console.log(result,"Hello____");
      this.ProductData = result;
      console.warn("This is my data:  ",this.ProductData.name);
    });
    if(this.ProductData){
      this.http.post<product>("http://localhost:3000/cart",this.ProductData);
      console.log("Ok data is stored in cart");
    }else{
      console.log("Data is not exist");
    }
    console.log(this.ProductData,"Tushar___");
  }
  limitIncrease(){
    this.limit = this.limit+5;
    this.message="Content is loading please wait";
    setTimeout(()=>{
      this.product.trendyProducts(this.limit).subscribe((data)=>{
        this.trendyProducts = data;
        this.message="";
      });
    },3000);
    
  }
}
