import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from 'src/app/models/login';
import { Request } from 'src/app/models/request';
import { AccountService } from 'src/app/services/account.service';
import { Md5 } from 'ts-md5';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-login',
  host:{class:"align-items-center"},
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [Md5]
})
export class LoginComponent implements OnInit {

  model:Login;
  loading:boolean;

  form:FormGroup;

  version: string;

  constructor(
    private route: ActivatedRoute,
    private _accountService:AccountService,
    private router: Router,
    private fb: FormBuilder,
    private md5: Md5,
    private snackbar: MatSnackBar,
    private titleService: Title,
    private _appService: AppService) {
       
      this.getVersion();
      this.titleService.setTitle("Login");
      localStorage.clear();
      
      this.model = new Login();
      route.params.subscribe(params=>{
        this.model.emailOrName = params['username'];
        this.form = this.fb.group({
          emailOrName: [this.model.emailOrName, Validators.required],
          password: ['', Validators.required]
        });
      })
    }

  ngOnInit(): void {
    if(localStorage.getItem('token')!=null){
      this.router.navigate(['/']);
    }
  }

  getVersion() {
    this._appService.getVersion().subscribe({
      next: (version: string) => {
        this.version = version;
      },
      error: (e) => {
        console.log(e);
      }
    })
  }

  onSubmit(){
    if(this.form.valid){
      this.loading=true;
      this.model = this.form.value;
      const md5 = new Md5();
      md5.appendStr(this.model.password.toString());
      this.model.password = md5.end();

      this._accountService.login(this.model)
        .subscribe({
          next: (req:Request) => {
            if(req.succeeded){
              var token = req.result.token;
              localStorage.setItem("token", token);
              localStorage.setItem("userName", req.result.userName);
              this.router.navigate(["/", req.result.userName]);
              this.snackbar.dismiss();
            }else{
              this.snackbar.open(req.message,'OK')
            }
          },
          error: (err) => { console.log(err); }
        }).add(()=>this.loading=false);
    }
  
  }

  @ViewChild('inputPass', { static: false }) 
   set input(element: ElementRef<HTMLInputElement>) {
     if(element && this.model.emailOrName) {
       element.nativeElement.focus()
     }
  }
}
