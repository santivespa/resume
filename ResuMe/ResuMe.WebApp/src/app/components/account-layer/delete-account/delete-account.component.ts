import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';
import { Request } from 'src/app/models/request';
import { Md5 } from 'ts-md5';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.scss'],
  providers: [Md5]
})
export class DeleteAccountComponent implements OnInit {


  password:string;
  confirmDelete:boolean;
  loading:boolean;

  constructor(private _accountService: AccountService, private router: Router,private md5: Md5,private snackbar: MatSnackBar,private titleService: Title) {
    this.titleService.setTitle("Delete account");
  }

  ngOnInit(): void {
  }

  onSubmit(){
   
    if(this.valid()){
      this.loading = true;
      let encryptedPassword = this.md5.appendStr(this.password).end();
      this._accountService.deleteAccount(encryptedPassword)
      .subscribe({
        next: (req: Request) =>{
          if(req.succeeded){
            localStorage.clear();
            this.router.navigate(['/login']);
            this.snackbar.open('Your account has been deleted 👋', 'OK',{duration:5000});
          }else{
            this.snackbar.open(req.message, 'OK');
          }
        },
        error: (e) =>{
          console.log(e);
        }
      }).add(()=>this.loading=false);
    }

      
  }

  valid(){

    return this.password && this.confirmDelete;
  }

}
