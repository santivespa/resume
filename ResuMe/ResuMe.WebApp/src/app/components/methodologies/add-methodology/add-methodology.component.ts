import { Component, Inject, OnInit } from '@angular/core';
import { Methodology } from '../../../models/methodology';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CurriculumService } from '../../../services/curriculum.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Request } from 'src/app/models/request';

@Component({
  selector: 'app-add-methodology',
  templateUrl: './add-methodology.component.html',
  styleUrls: ['./add-methodology.component.scss']
})
export class AddMethodologyComponent implements OnInit {

  levels: any[] = [{text:'Medium', value:0}, {text:'High', value:1},{ text:'Expert', value:2}];

  methodology:Methodology = new Methodology();
  newMethodology:boolean;
  loading:boolean;

  constructor(
    private _cvService: CurriculumService, 
    private _snackbar: MatSnackBar,
     public dialogRef: MatDialogRef<AddMethodologyComponent>,
     @Inject(MAT_DIALOG_DATA) data: any ) {
       this.newMethodology = data.newMethodology;
       if(!this.newMethodology){
         this.methodology = new Methodology(data.methodology);
       }
      }

  ngOnInit(): void {
  }

  onSubmit(){
    this.loading=true;
    if(this.valid()){
      const action = this.newMethodology? this._cvService.addMethodology(this.methodology):this._cvService.editMethodology(this.methodology);

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
     return this.methodology.description?.length>0 ;
  }
}
