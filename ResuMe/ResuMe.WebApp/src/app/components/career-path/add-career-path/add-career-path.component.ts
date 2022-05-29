import { Component, Inject, OnInit } from '@angular/core';
import { Request } from 'src/app/models/request';
import { CurriculumService } from '../../../services/curriculum.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CareerPath } from '../../../models/careerPath';

@Component({
  selector: 'app-add-career-path',
  templateUrl: './add-career-path.component.html',
  styleUrls: ['./add-career-path.component.scss']
})
export class AddCareerPathComponent implements OnInit {



  careerPath:CareerPath = new CareerPath();
  newCareerPath:boolean;
  loading:boolean;

  constructor(
    private _cvService: CurriculumService, 
    private _snackbar: MatSnackBar,
     public dialogRef: MatDialogRef<AddCareerPathComponent>,
     @Inject(MAT_DIALOG_DATA) data: any ) {
       this.newCareerPath = data.newCareerPath;
       if(!this.newCareerPath){
         this.careerPath = new CareerPath(data.careerPath);
       }
      }

  ngOnInit(): void {
  }

  onSubmit(){
 
    if(this.valid()){
      this.loading=true;
      const action = this.newCareerPath? this._cvService.addCareerPath(this.careerPath):this._cvService.editCareerPath(this.careerPath);

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
     return this.careerPath.company?.length>0 || this.careerPath.role?.length>0 || this.careerPath.period?.length>0;
  }
}
