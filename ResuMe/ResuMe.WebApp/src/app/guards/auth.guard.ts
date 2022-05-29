import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router : Router,private _authService: AuthService){

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{

    if(localStorage.getItem('token')!=null){
      let roles = next.data['permittedRoles'] as Array<string>;
      if(roles){
        if(this._authService.roleMatch(roles)) return true;
        else{
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
          return false;
        }
      }
      return true;
    }
    else{
      this.router.navigate(['/login']);
      return false; 
    }
  }
}
