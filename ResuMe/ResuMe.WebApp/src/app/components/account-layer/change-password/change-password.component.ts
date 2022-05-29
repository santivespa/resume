import { Component, OnInit } from '@angular/core';
import { Request } from 'src/app/models/request';
import { AccountService } from 'src/app/services/account.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Md5 } from 'ts-md5';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  providers: [Md5]
})
export class ChangePasswordComponent implements OnInit {

  model: ChangePassword = new ChangePassword();
  loading:boolean;

  form: FormGroup;
  
  constructor(private md5: Md5, private _accountService: AccountService,private snackbar: MatSnackBar,private fb: FormBuilder,private titleService: Title) {
    this.titleService.setTitle("Change password");


    this.form = this.fb.group({
      password:['',Validators.required],
      passwords: this.fb.group({
        newPassword:['',Validators.required],
        confirmPassword:['',[Validators.required]]
      },{validator: this.comparePasswords}),
      showPasswords:[]
    });
  }

  ngOnInit(): void {
  }


  onSubmit(){
    if(this.form.valid){
      this.loading = true;

      const md5 = new Md5();
      md5.appendStr(this.form.value.password.toString());
      this.model.password = md5.end();

      const md52 = new Md5();
      md52.appendStr(this.form.value.passwords.newPassword.toString());
      this.model.newPassword = md52.end();
 
      this._accountService.changePassword(this.model)
        .subscribe({
          next: (req:Request) => {
            if(req.succeeded){
              this.snackbar.open('password successfully changed','OK',{duration:3000});
              this.clearModel();
            }else{
              this.snackbar.open(req.message,'OK');
            }
          },
          error: (e) =>{
            console.log(e);
          }
        }).add(() => this.loading=false);
    }
   
  }

  valid(){
    return this.model.password && this.model.newPassword && this.model.confirmPassword;
  }

  clearModel(){
    this.form.reset();
    this.model = new ChangePassword();
  }

  comparePasswords(fb:FormGroup){
    let confirmPswrdCtrl = fb.get('confirmPassword');
    if(confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors ){
      if(fb.get('newPassword').value!=confirmPswrdCtrl.value){
        confirmPswrdCtrl.setErrors({passwordMismatch:true});
      }else{
        confirmPswrdCtrl.setErrors(null);
      }
    }
  }

}

export class ChangePassword{
  password:string | Int32Array;
  newPassword:string | Int32Array;
  confirmPassword:string;
  showPasswords:string;
}
