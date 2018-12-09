import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';
import {User} from '../models/Administrateurs';
import {Router} from '@angular/router';
import {AdministrateurService} from '../service/administrateur.service';


@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent implements OnInit {
user: User = { idAdmin: null , nom: '', prenom: '', email: '', motDePasse: '' };
error: boolean = false;
  constructor(private loginService: LoginService, private router: Router, private adminService: AdministrateurService ) { }

  ngOnInit() {
  }
  addUser(data) {
    // if (data.emailUser === compte.email && data.passwordUser === compte.password ) {
      this.router.navigate(['home'] );
   // } else { console.log('not okey');
 //   }


  }
  onLogin() {
       if (sessionStorage.getItem('administrateur') != null) { sessionStorage.removeItem('administrateur'); }
       this.adminService.getadmin(this.user.email).subscribe( resp => {
         this.user = resp;
         const val = JSON.stringify(this.user);
         sessionStorage.setItem('administrateur', val);
      } );

       this.loginService.login(this.user).subscribe(
      result => {this.error = false;   console.log(sessionStorage.getItem('administrateur')); },
      error => this.error = true );
    }

}
