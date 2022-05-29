import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Request } from 'src/app/models/request';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  providers:[Md5]
})
export class ResetPasswordComponent implements OnInit {

  token: string;
  email: string;
  form: FormGroup;
  loading: boolean;

  constructor(
    private _accountService: AccountService,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private md5: Md5,
    private router: Router) { 

    route.params.subscribe(params=>{
      this.token = params['token'];
      this.email = params['email'];

      this.form = this.fb.group({
        passwords: this.fb.group({
          password:['',Validators.required],
          confirmPassword:['',[Validators.required]]
        },{validator: this.comparePasswords}),
        showPasswords:[]
      });
    });


  }

  ngOnInit(): void {
  }

  onSubmit(){
    const md5 = new Md5();
    md5.appendStr(this.form.value.passwords.password.toString());

    let model = {
      token: this.token,
      email: this.email,
      password: md5.end()
    };
    
    this.loading = true;
    this._accountService.resetPassword(model)
    .subscribe({
      next:(req: Request)=>{
        if(req.succeeded){
          let snackbarRef =  this.snackbar.open('Your password has been changed.','Go to login');

          snackbarRef.afterDismissed().subscribe(() => {
           this.router.navigate(['login',this.email]);
          });
        }else{
          this.snackbar.open(req.message,'OK');
        }
      },
      error: (e) =>{
        console.log(e);
      }
    }).add(()=>this.loading=false);
    
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
}
