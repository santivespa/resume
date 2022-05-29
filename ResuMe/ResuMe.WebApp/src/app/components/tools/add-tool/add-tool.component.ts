import { Component, Inject, OnInit } from '@angular/core';
import { Tool } from 'src/app/models/tool';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CurriculumService } from '../../../services/curriculum.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Request } from 'src/app/models/request';

@Component({
  selector: 'app-add-tool',
  templateUrl: './add-tool.component.html',
  styleUrls: ['./add-tool.component.scss']
})
export class AddToolComponent implements OnInit {

  levels: any[] = [{text:'Medium', value:0}, {text:'High', value:1},{ text:'Expert', value:2}];

  tool:Tool = new Tool();
  newTool:boolean;
  loading:boolean;

  constructor(
    private _cvService: CurriculumService, 
    private _snackbar: MatSnackBar,
     public dialogRef: MatDialogRef<AddToolComponent>,
     @Inject(MAT_DIALOG_DATA) data: any ) {
       this.newTool = data.newTool;
       if(!this.newTool){
         this.tool = new Tool(data.tool);
       }
      }

  ngOnInit(): void {
  }

  onSubmit(){
    this.loading=true;
    if(this.valid()){
      const action = this.newTool? this._cvService.addTool(this.tool):this._cvService.editTool(this.tool);

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
     return this.tool.description?.length>0 ;
  }
}
