import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { tap } from 'rxjs/operators';
import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private router:Router){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     
            const clonedReq = req.clone({
                headers: req.headers.set('Authorization','Bearer '+localStorage.getItem('token'))
            });
            return next.handle(clonedReq).pipe(
                tap(
                    (succ: any) =>{
                        if(succ && succ.body && succ.body){
                            if(succ.body.code == 1){
                                localStorage.removeItem('token');
                                this.router.navigate(['/user/login']);
                            }
                        }
                    },
                    err =>{
                        if( err.status == 401){
                            localStorage.removeItem('token');
                            this.router.navigate(["/user/login"]); 
                        }
                    }
                )
            );
    }
    
}