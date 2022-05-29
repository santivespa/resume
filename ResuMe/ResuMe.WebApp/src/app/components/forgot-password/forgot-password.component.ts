import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Request } from 'src/app/models/request';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  emailOrName: string;
  loading: boolean;

  constructor(private route: ActivatedRoute, private _accountService: AccountService,private snackbar: MatSnackBar,private titleService: Title) {
    this.titleService.setTitle("Forgot password");

    route.params.subscribe(params=>{
      this.emailOrName = params['emailOrName'];
    });
  }

  ngOnInit(): void {

  }

  onSubmit(){
    this.loading = true;
    this._accountService.recoverPassword(this.emailOrName)
      .subscribe({
        next:(req: Request)=>{
          if(req.succeeded){
            this.snackbar.open('An email has been sent to you to reset your password.','OK');
          }else{
            this.snackbar.open(req.message,'OK');
          }
        },
        error: (e) =>{
          console.log(e);
        }
      }).add(()=>this.loading=false);
    
  }
}
