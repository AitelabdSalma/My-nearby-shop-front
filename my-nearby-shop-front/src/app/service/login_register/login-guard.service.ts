import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {LoginService} from '../login.service';

@Injectable()
export class LoginGuardService implements CanActivate {

  constructor(private authService: LoginService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (this.authService.isLoggedOut()) {
      return true;
    }
    // not logged in so redirect to login page with the return url and return false
    // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    this.router.navigate(['/home']);
    return false;
  }
}
