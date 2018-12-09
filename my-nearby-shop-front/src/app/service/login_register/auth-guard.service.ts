import { Injectable } from '@angular/core';
import {LoginService} from '../login.service';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';

@Injectable()
export class AuthGuardService {

  constructor(private authService: LoginService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (this.authService.isLoggedIn()) {
      return true;
    }
    // not logged in so redirect to login page with the return url and return false
    // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    this.router.navigate(['/login']);
    return false;
  }
}
