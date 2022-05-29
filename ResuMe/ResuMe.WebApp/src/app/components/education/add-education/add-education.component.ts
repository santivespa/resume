import { Component, Inject, OnInit } from '@angular/core';
import { Education } from '../../../models/education';
import { CurriculumService } from '../../../services/curriculum.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Request } from 'src/app/models/request';

@Component({
  selector: 'app-add-education',
  templateUrl: './add-education.component.html',
  styleUrls: ['./add-education.component.scss']
})
export class AddEducationComponent implements OnInit {


  
  education:Education = new Education();
  newEducation:boolean;
  loading:boolean;

  constructor(
    private _cvService: CurriculumService, 
    private _snackbar: MatSnackBar,
     public dialogRef: MatDialogRef<AddEducationComponent>,
     @Inject(MAT_DIALOG_DATA) data: any ) {
       this.newEducation = data.newEducation;
       if(!this.newEducation){
         this.education = new Education(data.education);
       }
      }


  ngOnInit(): void {
  }

  onSubmit(){
 
    if(this.valid()){
      this.loading=true;
      const action = this.newEducation? this._cvService.addEducation(this.education):this._cvService.editEducation(this.education);

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


  valid(){
     return this.education.title?.length>0 || this.education.institution?.length>0 || this.education.period?.length>0;
  }
}
