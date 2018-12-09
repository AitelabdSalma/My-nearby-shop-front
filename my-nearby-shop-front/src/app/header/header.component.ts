import { Component, OnInit } from '@angular/core';
import { User } from '../models/Administrateurs';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  
user: User;
constructor( private authService: LoginService) {
}
logout() {
  this.authService.logout();
  sessionStorage.removeItem('notificationArray');
  sessionStorage.removeItem('administrateur');
}

ngOnInit() {
 if ( sessionStorage.getItem('administrateur') != null) {
    this.user = JSON.parse(sessionStorage.getItem('administrateur')); }
  console.log(this.user);
}



}
