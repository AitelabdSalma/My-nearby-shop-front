import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { Observable } from "rxjs";
import {environment} from '../../environments/environment';
import { Shop } from '../models/Shop';

@Injectable()
export class ShopsService {
  API_URL = environment.apiUrl;
    constructor(private http: HttpClient) {}
  
    
      getShops(mc: string, size: number, page: number ): Observable <any> {
        return  this.http.get(this.API_URL + "/api/shops?mc=" + mc + "&size=" + size + "&page=" + page, { responseType: 'json' });
      }
      getAllShop(): Observable <any> {
        return  this.http.get(this.API_URL +"/api/allShop", { responseType: 'json' });
      }
    
      updateShop(shop:Shop): Observable<any> {
        const url = this.API_URL + '/api/updateShop';
        return this.http.post(url, shop , {observe: 'response'});
      }
    }
    