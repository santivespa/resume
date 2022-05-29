import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Request } from 'src/app/models/request';
import { Methodology } from '../../../models/methodology';
import { AddMethodologyComponent } from '../add-methodology/add-methodology.component';
import { CurriculumService } from '../../../services/curriculum.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'methodologies',
  templateUrl: './methodologies.component.html',
  styleUrls: ['./methodologies.component.scss']
})
export class MethodologiesComponent implements OnInit {

  @Input() methodologies: Methodology[];
  @Input() currentUser: boolean;
  isSigned: boolean;

  constructor(private dialog: MatDialog, private _cvService: CurriculumService,private _snackbar: MatSnackBar,private _authService: AuthService) { 
    this.isSigned = _authService.isSigned;
  }

  ngOnInit(): void {
  }

  add(){
   let dialogRef = this.dialog.open(AddMethodologyComponent, {
      width: '300px',
      data:{
        newMethodology:true
      }
    });

    dialogRef.afterClosed().subscribe(
      data => {
        if(data){
          this.methodologies.push(data);
        }
      }
    )
  }

  edit(item: Methodology){
    let dialogRef = this.dialog.open(AddMethodologyComponent, {
      width: '300px',
      data:{
        newMethodology:false,
        methodology:item
      }
    });

    dialogRef.afterClosed().subscribe(
      data => {
        if(data){
          let idx = this.methodologies.indexOf(item);
          this.methodologies[idx] = data;
        }
      }
    )
  }

  delete(item: Methodology){
    if(confirm("Are you sure to delete this item?")) {
     
      this.methodologies.splice(this.methodologies.indexOf(item),1);

      this._cvService.deleteMethodology(item.id)
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
  onContextMenu(event: MouseEvent, item: Methodology) {
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
