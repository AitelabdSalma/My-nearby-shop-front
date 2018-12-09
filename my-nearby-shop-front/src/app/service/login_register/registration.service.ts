import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
const API_URL = environment.apiUrl;
@Injectable()
export class RegistrationService {

  constructor(private http: HttpClient, private router: Router) { }
  public register(login): Observable<any> {
    const url = API_URL + '/api/sign-up';
    return this.http.post(url, login, {responseType: 'json'});

  }

  registered(response) {
    this.router.navigate(['/login']);
  }

  
}
