import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private API_URL= environment.apiUrl;

  constructor(private http : HttpClient) { }
  loginForm(Req : any){
    const Url=this.API_URL+'/api/User';
    return this.http.post(Url,Req);
  }
}
