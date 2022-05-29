import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddLanguageComponent } from '../add-language/add-language.component';
import { Language } from '../../../models/language';
import { MatMenuTrigger } from '@angular/material/menu';
import { CurriculumService } from '../../../services/curriculum.service';
import { Request } from 'src/app/models/request';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss']
})
export class LanguagesComponent implements OnInit {


  @Input() languages: Language[];
  @Input() currentUser: boolean;
  isSigned:boolean;

  constructor(private dialog: MatDialog, private _cvService: CurriculumService,private _snackbar: MatSnackBar,private _authService: AuthService) { 
    this.isSigned = _authService.isSigned;
  }

  ngOnInit(): void {
  }

  addLanguage(){
   let dialogRef = this.dialog.open(AddLanguageComponent, {
      width: '300px',
      data:{
        newLanguage:true
      }
    });

    dialogRef.afterClosed().subscribe(
      data => {
        if(data){
          this.languages.push(data);
        }
      }
    )
  }

  editLanguage(item: Language){
    let dialogRef = this.dialog.open(AddLanguageComponent, {
      width: '300px',
      data:{
        newLanguage:false,
        language:item
      }
    });

    dialogRef.afterClosed().subscribe(
      data => {
        if(data){
          let idx = this.languages.indexOf(item);
          this.languages[idx] = data;
          //this.languages.push(data);
        }
      }
    )
  }

  deleteLanguage(item: Language){
    if(confirm("Are you sure to delete this item?")) {
     
      this.languages.splice( this.languages.indexOf(item),1);
      this._cvService.deleteLanguage(item.id)
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
  onContextMenu(event: MouseEvent, item: Language) {
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
