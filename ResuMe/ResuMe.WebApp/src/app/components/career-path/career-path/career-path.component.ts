import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CareerPath } from 'src/app/models/careerPath';
import { CurriculumService } from '../../../services/curriculum.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddCareerPathComponent } from '../add-career-path/add-career-path.component';
import { Request } from 'src/app/models/request';
import { MatMenuTrigger } from '@angular/material/menu';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'career-path',
  templateUrl: './career-path.component.html',
  styleUrls: ['./career-path.component.scss']
})
export class CareerPathComponent implements OnInit {

  @Input() careerPaths: CareerPath[];
  @Input() currentUser: boolean;
  isSigned:boolean;

  constructor(private dialog: MatDialog, private _cvService: CurriculumService,private _snackbar: MatSnackBar,private _authService: AuthService) { 
    this.isSigned = _authService.isSigned;
  }

  ngOnInit(): void {
  }

  add(){
   let dialogRef = this.dialog.open(AddCareerPathComponent, {
      width: '300px',
      data:{
        newCareerPath:true
      }
    });

    dialogRef.afterClosed().subscribe(
      data => {
        if(data){
          this.careerPaths.push(data);
        }
      }
    )
  }

  edit(item: CareerPath){
    let dialogRef = this.dialog.open(AddCareerPathComponent, {
      width: '300px',
      data:{
        newCareerPath:false,
        careerPath:item
      }
    });

    dialogRef.afterClosed().subscribe(
      data => {
        if(data){
          let idx = this.careerPaths.indexOf(item);
          this.careerPaths[idx] = data;
        }
      }
    )
  }

  delete(item: CareerPath){
    if(confirm("Are you sure to delete this item?")) {

      this.careerPaths.splice(this.careerPaths.indexOf(item),1);

      this._cvService.deleteCareerPath(item.id)
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
  onContextMenu(event: MouseEvent, item: CareerPath) {
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
