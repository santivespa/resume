import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Education } from '../../../models/education';
import { CurriculumService } from '../../../services/curriculum.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddEducationComponent } from '../add-education/add-education.component';
import { Request } from 'src/app/models/request';
import { MatMenuTrigger } from '@angular/material/menu';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {


  @Input() educations: Education[]
  @Input() currentUser: boolean;
  isSigned:boolean;

  constructor(private dialog: MatDialog, private _cvService: CurriculumService,private _snackbar: MatSnackBar,private _authService: AuthService) { 
    this.isSigned = _authService.isSigned;
  }

  ngOnInit(): void {
  }

  add(){
    let dialogRef = this.dialog.open(AddEducationComponent, {
       width: '300px',
       data:{
         newEducation:true
       }
     });
 
     dialogRef.afterClosed().subscribe(
       data => {
         if(data){
           this.educations.push(data);
         }
       }
     )
   }

   edit(item: Education){
    let dialogRef = this.dialog.open(AddEducationComponent, {
      width: '300px',
      data:{
        newEducation:false,
        education:item
      }
    });

    dialogRef.afterClosed().subscribe(
      data => {
        if(data){
          let idx = this.educations.indexOf(item);
          this.educations[idx] = data;
        }
      }
    );
  }

  delete(item: Education){
    if(confirm("Are you sure to delete this item?")) {

      this.educations.splice(this.educations.indexOf(item),1);

      this._cvService.deleteEducation(item.id)
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

  
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };
  onContextMenu(event: MouseEvent, item: Education) {
    if(this.isSigned){
      event.preventDefault();
      this.contextMenuPosition.x = event.clientX + 'px';
      this.contextMenuPosition.y = event.clientY + 'px';
      this.contextMenu.menuData = { 'item': item };
      this.contextMenu.menu.focusFirstItem('mouse');
      this.contextMenu.openMenu();
    }
  }

}
