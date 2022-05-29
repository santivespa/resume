import { Component, Inject, NgZone, OnInit, ViewChild } from '@angular/core';
import { CurriculumService } from '../../../services/curriculum.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from '../../../models/project';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';
import { Request } from 'src/app/models/request';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {


  newProject:boolean=false;
  project:Project = new Project();
  loading:boolean;

  constructor( private _ngZone: NgZone,
    private _cvService: CurriculumService, 
    private _snackbar: MatSnackBar,
    public dialogRef: MatDialogRef<AddProjectComponent>,
    @Inject(MAT_DIALOG_DATA) data: any ) { 
      this.newProject = data.newProject;
      if(!this.newProject){
        this.project = new Project(data.project);
      }
    }

  ngOnInit(): void {
  }

 
  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
        .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  onSubmit(){
    if(this.valid()){
      this.loading=true;
      const action = this.newProject? this._cvService.addProject(this.project):this._cvService.editProject(this.project);
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
    return true;
  }
}
