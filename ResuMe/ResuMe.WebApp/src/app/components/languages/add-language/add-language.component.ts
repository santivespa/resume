import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CurriculumService } from 'src/app/services/curriculum.service';
import { Language } from '../../../models/language';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Request } from 'src/app/models/request';

@Component({
  selector: 'app-add-language',
  templateUrl: './add-language.component.html',
  styleUrls: ['./add-language.component.scss']
})
export class AddLanguageComponent implements OnInit {


  nivels: any[] = [{text:'Beginner',value:0}, {text:'Medium',value:1},{ text:'Native',value:2}];
  language:Language = new Language();

  newLanguage:boolean;
  loading:boolean;

  constructor(
    private _cvService: CurriculumService, 
    private _snackbar: MatSnackBar,
     public dialogRef: MatDialogRef<AddLanguageComponent>,
     @Inject(MAT_DIALOG_DATA) data: any ) {
       this.newLanguage = data.newLanguage;
       if(!this.newLanguage){
         this.language = new Language(data.language);
       }
      }

  ngOnInit(): void {
  }

  onSubmit(){
    this.loading=true;
    if(this.validLanguage()){
      const action = this.newLanguage? this._cvService.addLanguage(this.language):this._cvService.editLanguage(this.language);

      action
        .subscribe({
          next: (request:Request) => {
            if(!request.succeeded){
              this._snackbar.open(request.message, "OK");
            }else{
              this.dialogRef.close(request.result);
            }
          },
          error: (err) => {
              console.log(err);
          }
        }).add(()=>this.loading=false);
    }
  }


  validLanguage(){
     return this.language.languageName?.length>0 && ( this.language.nivel == 0 || this.language.nivel == 1 || this.language.nivel == 2);
  }
}