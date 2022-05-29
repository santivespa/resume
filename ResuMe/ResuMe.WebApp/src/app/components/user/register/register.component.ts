import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Register } from 'src/app/models/register';
import { AccountService } from 'src/app/services/account.service';
import { Md5 } from 'ts-md5';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Request } from 'src/app/models/request';
import { User } from '../../../models/user';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  host:{class:"align-items-center"},
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [Md5]
})
export class RegisterComponent implements OnInit {


  model:Register = new Register();
  loading:boolean;

  form:FormGroup;


  constructor(
    private _accountService: AccountService,
    private snackbar: MatSnackBar,
    private router: Router,
    private fb: FormBuilder,
    private titleService: Title) {
      this.titleService.setTitle("Register");

      this.form = this.fb.group({
        email: ['', Validators.required],
        fullName: ['',Validators.required],
        userName: ['',Validators.required],
        passwords: this.fb.group({
          password:['',Validators.required],
          confirmPassword:['',[Validators.required]]
        },{validator: this.comparePasswords})
      });
   }

  ngOnInit(): void {
    if(localStorage.getItem('token')!=null){
      //this.router.navigate(["/home"]);
      this.router.navigate(['/user-profile']);
    }
  }

  onSubmit(){
    if(this.form.valid){
      let password = this.form.value.passwords.password;
      this.loading=true;

      this.model.email = this.form.controls.email.value
      this.model.userName = this.form.controls.userName.value;
      this.model.fullName = this.form.controls.fullName.value;

      let md5 = new Md5();
      md5.appendStr(password.toString());
      this.model.password = md5.end();

      this._accountService.register(this.model)
        .subscribe({
          next: (req:Request) => {
            if(req.succeeded){
              this.snackbar.open("Registered successfully","OK",{duration:3000});
             // this.router.navigate(["/login",this.model.userName]); 
              this.login();
            }else{
              console.log(req);
              this.snackbar.open(req.message,'OK');
            }
          },
          error: (err) => { console.log(err); }
        }).add(()=>this.loading=false);
      }
    }

  comparePasswords(fb:FormGroup){
    let confirmPswrdCtrl = fb.get('confirmPassword');
    if(confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors ){
      if(fb.get('password').value!=confirmPswrdCtrl.value){
        confirmPswrdCtrl.setErrors({passwordMismatch:true});
      }else{
        confirmPswrdCtrl.setErrors(null);
      }
    }
  }


  login(){
    var loginModel = {
      emailOrName: this.model.email,
      password: this.model.password
    }
    this._accountService.login(loginModel)
    .subscribe({
      next: (req:Request) => {
        if(req.succeeded){
          var token = req.result.token;
          localStorage.setItem("token",token);
          this.router.navigate(["/",req.result.userName]);
        }else{
          this.snackbar.open(req.message,'OK')
        }
      },
      error: (err) => { console.log(err); }
    });
  }

}
