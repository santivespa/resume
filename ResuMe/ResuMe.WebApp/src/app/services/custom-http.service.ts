import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CustomHttpService {

  constructor(private http:HttpClient) { }

  get( query: string ){
    return this.http.get(environment.base_url +query);
  }

  post( query: string, body?:any ){
    return this.http.post(environment.base_url+query,body);
  }

  put( query: string, body?:any ){
    return this.http.post(environment.base_url+query,body);
  }

  delete( query:string ){
    return this.http.get(environment.base_url+query );
  }

}
