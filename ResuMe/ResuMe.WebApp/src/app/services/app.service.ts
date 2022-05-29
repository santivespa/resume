import { Injectable } from "@angular/core";
import { CustomHttpService } from './custom-http.service';

@Injectable({
    providedIn: 'root'
  })
  export class AppService {
  
  
    controller='app';
  
    constructor(private http: CustomHttpService) { }
  
  
    getVersion() {
        return this.http.get(`${this.controller}/get-version`);
    }
  }
  