import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Request } from 'src/app/models/request';
import { User } from 'src/app/models/user';
import { AccountService } from '../../services/account.service';
import { MsgService } from '../../services/msg.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';
import { runInThisContext } from 'vm';
import { Title } from '@angular/platform-browser';
import { CdkCopyToClipboard } from '@angular/cdk/clipboard';
import { ClipboardService } from 'ngx-clipboard';
import { CurriculumService } from 'src/app/services/curriculum.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  host:{class:"flex-1"},
})
export class UserProfileComponent implements OnInit {


  userName:string;
  user:User;
  currentUserName:string;

  private:boolean;
  currentUser:boolean;
  isSigned:boolean;
  loading:boolean;

  constructor(
    private route:ActivatedRoute,
     private _accountService: AccountService,
     private router: Router,
     private _msgService: MsgService,
     private snackbar: MatSnackBar,
     private _authService: AuthService,
     private clipboardApi: ClipboardService,
     private _curriculumService: CurriculumService) {
    
    route.params.subscribe(params=>{
      this.userName = params['username'];
      this.loadProfile();
  
    });

    _msgService.$emitterUserNameChanged.subscribe((user:User) =>{
      if(user){
        this.user.fullName = user.fullName;
        this.user.linkedin = user.linkedin;
        this.user.role=user.role;
        this.user.years=user.years;
        this.user.yearsOfExperience=user.yearsOfExperience;
        if(user.profileImage){
          this.user.profileImage = user.profileImage;
        }
      }
    });
    this.isSigned = _authService.isSigned;
   }

  ngOnInit(): void {

  }

  loadProfile(){
    this.loading = true;
    this._accountService.getBasicInfo(this.userName?this.userName:'')
    .subscribe({
      next: (req:Request) => {
         if(req.succeeded){
            this.user = req.result;
            if(!this.userName){
              this.router.navigate([this.user.userName]);
            }
            this.private = this.user.private;
            this.currentUser =this.user.currentUser;
            this.userName = this.user.userName;

            localStorage.setItem('userName',this.user.userName);
         }else{
           if(req.code===0){
             this.router.navigate(['404']);
           }
         }
      }
      ,error: (e) =>{
        console.log(e);
      }
    }).add(()=>this.loading=false);
  }

  TooglePrivate(){
  
   this._accountService.togglePrivate(!this.private)
     .subscribe({
       next: (req:Request) =>{
        if(req.succeeded){
          this.private = !this.private;
        }else{
          this.snackbar.open(req.message,'OK');
        }
       },
       error: (e) =>{
         console.log(e);
         
       }
     })
  }

  loadingPDF:boolean;
  generatePDF(){
    this.loadingPDF = true;
    this.snackbar.open("This action may take a moment", "OK", {duration:3000})
    this._curriculumService.generatePDF(this.user.userName)
    .subscribe({
      next: (req:Request) =>{

        const linkSource = 'data:application/pdf;base64,' + req.result;
        const downloadLink = document.createElement("a");
        const fileName = `${this.user.fullName} cv.pdf`;

        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
       
      },
      error: (e) =>{
        console.log(e);
        
      }
      }).add(()=>{
        this.loadingPDF=false;
    });
  }
 

  copyProfileLink(){
    let profileLink = `${environment.web_app_url}#/${this.userName}`;
    this.clipboardApi.copyFromContent(profileLink);
    this.snackbar.open('Profile link copied to clipboard ','OK',{duration:2000});
  }
}
