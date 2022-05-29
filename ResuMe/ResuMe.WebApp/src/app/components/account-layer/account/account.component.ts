import { Component, OnInit } from '@angular/core';
import { Request } from 'src/app/models/request';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MsgService } from '../../../services/msg.service';
import { Title } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  user: User = new User();
  loading:boolean;
  loadingProfile:boolean;

  imageBase64:any;
  imageBase64Selected:any;

  cropper = require('../../../../assets/dist/cropper/cropper.js');
  cropperObj: any;

  
  constructor(private datePipe: DatePipe,private _accountService: AccountService,private snackbar: MatSnackBar,private _msgService: MsgService,private titleService: Title) {
    this.titleService.setTitle("Account settings");
   }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(){

  this.loadingProfile = true;
    this._accountService.getProfile()
    .subscribe({
      next: (req:Request) => {
         if(req.succeeded){
           console.log(req.result);
           
            this.user = req.result;
            if(this.user.birthdate){
              this.user.birthdate = this.datePipe.transform(this.user.birthdate, 'yyyy-MM-dd');
            }
            
         }
      }
      ,error: (e) =>{
        console.log(e);
      }
    }).add(()=>this.loadingProfile=false);
  }

  onSubmit(){
    if(this.valid()){
      this.loading = true;
      if(this.imageBase64Selected)
        this.user.profileImage = this.imageBase64Selected;
      this._accountService.updateProfile(this.user)
      .subscribe({
        next: (req:Request) => {
          if(req.succeeded){
            this.snackbar.open('Changes successfully saved','OK',{duration:3000});
            this.user.years = req.result.years;
            localStorage.setItem("userName", this.user.userName);
            this._msgService.emitUserNameChanged(this.user);
          }else{
            this.snackbar.open(req.message,'OK');
          }
        },
        error: (e) =>{
          console.log(e);
        }
      }).add(()=> this.loading = false);
    }
  }

  valid(){
    return this.user.fullName && this.user.userName;
  }


  handleUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imageBase64 = reader.result
        this.imageBase64Selected = reader.result;
    };
  }


  cropSelectedImage() {
    if (this.cropperObj != null) {
      this.cropperObj.destroy();
      this.cropperObj = null;
    }
    this.showCropModal(this.imageBase64);
  }

  showCropModal(imageToCrop: string) {
    if (imageToCrop != '') {
      this.preloadImageFromURL(imageToCrop);
    }
  }


  private preloadImageFromURL(url: string) {
    var cropperJs = this.cropper; //the cropper js reference

    document.getElementById('imageReadyForCropping')
      .setAttribute(
        'src', url
      );

    var image = document.getElementById('imageReadyForCropping');

    this.cropperObj = new cropperJs(image, {
      minContainerHeight: 400,
      minContainerWidth: 400,
      autoCropArea: 0.5,
      aspectRatio: 1,
      viewMode: 1,
    });

  }

  cropImage(){
   
      var canvas;
      if (this.cropperObj) {
        canvas = this.cropperObj.getCroppedCanvas();
        this.imageBase64Selected = canvas.toDataURL();
      };
    
  }

}
