import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Technology } from '../../../models/technology';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CurriculumService } from '../../../services/curriculum.service';
import { Request } from 'src/app/models/request';

@Component({
  selector: 'app-add-technology',
  templateUrl: './add-technology.component.html',
  styleUrls: ['./add-technology.component.scss']
})
export class AddTechnologyComponent implements OnInit {

  levels: any[] = [{text:'Medium', value:0}, {text:'High', value:1},{ text:'Expert', value:2}];

  technology:Technology = new Technology();
  newTechnology:boolean;
  loading:boolean;

  constructor(
    private _cvService: CurriculumService, 
    private _snackbar: MatSnackBar,
     public dialogRef: MatDialogRef<AddTechnologyComponent>,
     @Inject(MAT_DIALOG_DATA) data: any ) {
       this.newTechnology = data.newTechnology;
       if(!this.newTechnology){
         this.technology = new Technology(data.technology);
       }
      }

  ngOnInit(): void {
  }

  onSubmit(){
    this.loading=true;
    if(this.valid()){
      const action = this.newTechnology? this._cvService.addTechnology(this.technology):this._cvService.editTechnology(this.technology);

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
     return this.technology.description?.length>0 ;
  }
}
