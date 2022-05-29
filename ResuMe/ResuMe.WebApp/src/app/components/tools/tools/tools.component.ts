import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Methodology } from '../../../models/methodology';
import { CurriculumService } from '../../../services/curriculum.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddMethodologyComponent } from '../../methodologies/add-methodology/add-methodology.component';
import { Request } from 'src/app/models/request';
import { MatMenuTrigger } from '@angular/material/menu';
import { AddToolComponent } from '../add-tool/add-tool.component';
import { Tool } from 'src/app/models/tool';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit {

  @Input() tools: Tool[];
  @Input() currentUser: boolean;
  isSigned:boolean;

  constructor(private dialog: MatDialog, private _cvService: CurriculumService,private _snackbar: MatSnackBar,private _authService: AuthService) { 
    this.isSigned = _authService.isSigned;
  }

  ngOnInit(): void {
  }

  add(){
   let dialogRef = this.dialog.open(AddToolComponent, {
      width: '300px',
      data:{
        newTool:true
      }
    });

    dialogRef.afterClosed().subscribe(
      data => {
        if(data){
          this.tools.push(data);
        }
      }
    )
  }

  edit(item: Tool){
    let dialogRef = this.dialog.open(AddToolComponent, {
      width: '300px',
      data:{
        newTool:false,
        tool:item
      }
    });

    dialogRef.afterClosed().subscribe(
      data => {
        if(data){
          let idx = this.tools.indexOf(item);
          this.tools[idx] = data;
        }
      }
    )
  }

  delete(item: Tool){
    if(confirm("Are you sure to delete this item?")) {
      this.tools.splice(this.tools.indexOf(item),1);
      this._cvService.deleteTool(item.id)
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
  onContextMenu(event: MouseEvent, item: Tool) {
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
