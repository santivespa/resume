import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { Request } from 'src/app/models/request';
import { Technology } from 'src/app/models/technology';
import { AddTechnologyComponent } from '../add-technology/add-technology.component';
import { CurriculumService } from '../../../services/curriculum.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'technologies',
  templateUrl: './technologies.component.html',
  styleUrls: ['./technologies.component.scss']
})
export class TechnologiesComponent implements OnInit {
  @Input() technologies: Technology[];
  @Input() currentUser: boolean;
  isSigned:boolean;

  constructor(private dialog: MatDialog, private _cvService: CurriculumService,private _snackbar: MatSnackBar,private _authService: AuthService) { 
    this.isSigned = _authService.isSigned;
  }

  ngOnInit(): void {
  }

  add(){
   let dialogRef = this.dialog.open(AddTechnologyComponent, {
      width: '300px',
      data:{
        newTechnology:true
      }
    });

    dialogRef.afterClosed().subscribe(
      data => {
        if(data){
          this.technologies.push(data);
        }
      }
    )
  }

  edit(item: Technology){
    let dialogRef = this.dialog.open(AddTechnologyComponent, {
      width: '300px',
      data:{
        newTechnology:false,
        technology:item
      }
    });

    dialogRef.afterClosed().subscribe(
      data => {
        if(data){
          let idx = this.technologies.indexOf(item);
          this.technologies[idx] = data;
        }
      }
    )
  }

  delete(item: Technology){
    if(confirm("Are you sure to delete this item?")) {
      this.technologies.splice(this.technologies.indexOf(item),1);

      this._cvService.deleteTechnology(item.id)
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
  onContextMenu(event: MouseEvent, item: Technology) {
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
