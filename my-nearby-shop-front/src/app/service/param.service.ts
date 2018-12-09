import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from '../../../node_modules/rxjs';
import {environment} from '../../environments/environment';

@Injectable()
export class ParamService {
  API_URL = environment.apiUrl;
  
  _url_mois: string = '../../assets/Data/moisBap.json';
  _url_situation: string = '../../assets/Data/situationFamiliale.json';
  _url_put: string = '../../assets/Data/output.json';
  constructor (private _http: HttpClient) {}

  

  putObject(object): Observable<any> {
   return this._http.get(this.API_URL + "/api/setParam?shop=" + object.shop  , { observe: 'response'});
  }

  putShop(object): Observable<any> {
    console.log(object);
    return this._http.get(this.API_URL +  "/api/setParam?shop=" + object.shop , { observe: 'response'});
   }
  

}
