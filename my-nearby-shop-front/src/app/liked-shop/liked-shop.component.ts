import { Component, OnInit } from '@angular/core';
import { Shop } from '../models/Shop';
import { HttpClient } from '@angular/common/http';
import { ShopsService } from '../service/shop.service';
import { DomSanitizer } from '@angular/platform-browser';
import { timer } from '../models/timer';
@Component({
  selector: 'app-liked-shop',
  templateUrl: './liked-shop.component.html',
  styleUrls: ['./liked-shop.component.css']
})
export class LikedShopComponent implements OnInit {

  constructor( private http: HttpClient,
    public shopService: ShopsService, private sanitizer: DomSanitizer) {}

    pageShop: any;
    
    MotCle = '';
   
    currentPage = 0 ;
    size = 20 ;
    pages: Array<number>;
    nombreElement: number;
    
    myTimer: timer[]=[];
  

  shop:Shop[];
  nearbyshop: Shop []=[];
  selectedShop:Shop;
  reverse: boolean = true;
  key: string = 'nom'; 
  time: number = 0;
  interval;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  } 

  ngOnInit() {
    console.log('Initialisation  ...');
    this.nearbyshop=[];
    for(let a of this.myTimer){
      if(a.time>= 7200){
        this.pauseTimer(a.id);
      }
    }
    this.shopService
    .getShops( this.MotCle , this.size , this.currentPage )
    .subscribe(resp => {
      this.pageShop = resp;
      console.log(this.pageShop);
      this.shop = this.pageShop.content as Shop[];
      this.pages = new Array<number>(this.pageShop.totalPages);
      this.nombreElement = this.pageShop.totalElements;
      console.log(this.shop);

      for(let s of this.shop){
          
        console.log(s);
        if(s.liked == true){
        
          this.nearbyshop.push(s);
        
        }
        console.log(this.nearbyshop);
       
      }
      
    }, 
    err => console.log(err)
    );

  }
  refresh(): void {
    window.location.reload();
  }
 
  onDislike(i){
    this.selectedShop = this.nearbyshop[i];
    console.log('myshop');
    console.log(this.selectedShop);
    this.startTimer(i);
    console.log('myshop');
    console.log(this.selectedShop);
    this.shopService.updateShop(this.selectedShop).subscribe(resp => {
      console.log(resp);
      console.log('shop sent ...');
      this.refresh();
    }, err => {
      console.log(err);
      
    });

  }
 

startTimer(i) {
  this.selectedShop = this.nearbyshop[i];
  this.selectedShop.dismissed= true;
  this.myTimer[i].id= this.selectedShop.idShop;
  this.myTimer[i].play=true;
  this.interval = setInterval(() => {
    this.myTimer[i].time++;
  },1000);
   
  console.log('myshop');
  console.log(this.selectedShop);
  this.shopService.updateShop(this.selectedShop).subscribe(resp => {
    console.log(resp);
    console.log('shop sent ...');

    for(let a of this.myTimer){
      if(a.time>= 7200){
        this.pauseTimer(a.id);
      }
    }
    this.refresh();
  }, err => {
    console.log(err);
    
  });

 
}

pauseTimer(i) {
  this.selectedShop = this.nearbyshop[i];
  this.myTimer[i].play = false;
  clearInterval(this.interval);
  this.myTimer[i].time=0;
  this.selectedShop.idShop= this.myTimer[i].id;
  this.selectedShop.dismissed= false;
   
  console.log('myshop');
  console.log(this.selectedShop);
  this.shopService.updateShop(this.selectedShop).subscribe(resp => {
    console.log(resp);
    console.log('shop sent ...');

    this.refresh();
  }, err => {
    console.log(err);
    
  });

}

  onNotLike(i){
    this.selectedShop = this.nearbyshop[i];
    console.log('myshop');
    console.log(this.selectedShop);
    this.selectedShop.liked= false;
    
    console.log('myshop');
    console.log(this.selectedShop);
    this.shopService.updateShop(this.selectedShop).subscribe(resp => {
      console.log(resp);
      console.log('shop sent ...');

      for(let a of this.myTimer){
        if(a.time>= 7200){
          this.pauseTimer(a.id);
        }
      }
      this.refresh();
    }, err => {
      console.log(err);
      
    });
  }


}
