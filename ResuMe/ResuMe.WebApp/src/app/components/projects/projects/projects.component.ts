import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddProjectComponent } from '../add-project/add-project.component';
import { Project } from '../../../models/project';
import { CurriculumService } from '../../../services/curriculum.service';
import { Request } from 'src/app/models/request';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  @Input() projects: Project[];
  @Input() currentUser: boolean;

  constructor(private dialog: MatDialog,private _cvService: CurriculumService,private _snackbar: MatSnackBar) { }

  ngOnInit(): void {
    
  }


  addProjectDialog(){
    let dialogRef = this.dialog.open(AddProjectComponent,{
      width:'600px',
        data:{
          newProject:true
        }
      });
    
      dialogRef.afterClosed().subscribe(
        data => {
          if(data){
            this.projects.push(data);
          }
        }
      )
    }

    edit(item: Project){
      let dialogRef = this.dialog.open(AddProjectComponent,{
        width:'600px',
        data:{
          newProject:false,
          project:item
        }
      });

      dialogRef.afterClosed().subscribe(result=>{
        if(result){
          let idx = this.projects.indexOf(item);
          this.projects[idx] = result;
        }
      });
    }

    delete(item: Project){
      if(confirm("Are you sure to delete this item?")) {
        this.projects.splice(this.projects.indexOf(item),1);
        this._cvService.deleteProject(item.id)
          .subscribe({
            next: (request:Request) => {
              if(!request.succeeded){
                this._snackbar.open(request.message, "OK");
              }
            },
            error: (err) => {
                console.log(err);
            }
          });
      }
    }
  
}
