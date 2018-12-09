import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import moment = require('../../assets/bower_components/moment/moment');
import {AdministrateurService} from './administrateur.service';
import {User} from '../models/Administrateurs';


const API_URL = environment.apiUrl;


@Injectable()
export class LoginService {
  constructor(private http: HttpClient, private router: Router, private adminService: AdministrateurService) { }
  login(login): Observable<any> {
    const url = API_URL + '/api/login';
    return this.http.post(url, login, {observe: 'response'})
      .map(
        res => {
          this.setSession(res);
        } ,
        err => err
      );
  }
  private setSession(authResult) {
    if (authResult.status === 200) {
      const id_token = authResult.headers.get('Authorization');
      const expires_at = authResult.headers.get('expiresAt');
      const expiresAt = moment().add(expires_at, 'second');
      localStorage.setItem('id_token', id_token);
      localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
     // let user: User;
  //    if (sessionStorage.getItem('administrateur') != null) { sessionStorage.removeItem('administrateur'); }
   //   this.adminService.getadmin(login.email).subscribe( resp => user = resp );
   //   const val = JSON.stringify(user);
   //   window.localStorage.setItem('administrateur', val);

      this.router.navigate(['/home']);
    }
  }
  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('administrateur');
    this.router.navigate(['/login']);
  }
  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }
  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
