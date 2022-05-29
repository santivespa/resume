import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { Register } from '../models/register';
import { CustomHttpService } from './custom-http.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {


  controller='account';

  constructor(private http: CustomHttpService) { }


  register(model: Register){
    return this.http.post(`${this.controller}/register`,model);
  }
  
  login(model: Login){
    return this.http.post(`${this.controller}/login`,model);
  }

  getProfile(userName?: string){
    if(userName){
      return this.http.get(`${this.controller}/user-profile/${userName}`);

    }else{
      return this.http.get(`${this.controller}/user-profile`);
    }
  }

  getBasicInfo(userName?: string){
    if(userName){
      return this.http.get(`${this.controller}/get-basic-info/${userName}`);

    }else{
      return this.http.get(`${this.controller}/get-basic-info`);
    }
  }
  

  changePassword(model: any){
    return this.http.put(`${this.controller}/change-password`, model);
  }

  updateProfile(user: User){
    return this.http.put(`${this.controller}/update`, user);
  }

  deleteAccount(password: string | Int32Array){
    return this.http.delete(`${this.controller}/delete-account/${password}`);
  }

  togglePrivate(value: boolean){
    return this.http.put(`${this.controller}/toggle-private/${value}`);

  }
  

  recoverPassword(emailOrName: string){
    return this.http.put(`${this.controller}/recover-password/${emailOrName}`);

  }


  resetPassword(model: any){
    return this.http.put(`${this.controller}/reset-password`,model);

  }
}
