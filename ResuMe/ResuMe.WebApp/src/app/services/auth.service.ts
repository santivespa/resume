import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor() { }

  roleMatch(allowedRoles:any){
    let isMatch = false;
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));

    var userRole = payLoad.role;

    allowedRoles.forEach(element => {
      if(userRole == element){
        isMatch = true;
        return false;
      }
    });

    return isMatch;
  }

  get isAdmin(): boolean {
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    var userRole = payLoad.role;
    return userRole == 'Admin';
  }


  get isSigned(): boolean {
    var currentUser = localStorage.getItem('token');
    return currentUser != null;
  }
}
