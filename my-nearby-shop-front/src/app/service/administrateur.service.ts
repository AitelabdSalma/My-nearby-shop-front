import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from '../../../node_modules/rxjs';
import {environment} from '../../environments/environment';
import {User} from '../models/Administrateurs';

@Injectable()
export class AdministrateurService {

  API_URL = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getadmin(email:  string): Observable <any> {
    return  this.http.get(
      this.API_URL + "/api/administrateur?email=" + email ,
      { responseType: 'json' }
    );
  }
  updateAdmin(admin): Observable<any> {
    const url = this.API_URL + '/api/updateAdmin';
    return this.http.post(url, admin , {observe: 'response'});
  }
}
