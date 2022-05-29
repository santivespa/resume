import { Component, OnInit } from '@angular/core';
import { MsgService } from '../../services/msg.service';
import { AccountService } from '../../services/account.service';
import { Request } from 'src/app/models/request';
import { MatDialog } from '@angular/material/dialog';
import { AddProjectComponent } from '../projects/add-project/add-project.component';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';


export enum views{
  skills,
  projects,
  careerPath,
  education
}

@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.scss']
})
export class CurriculumComponent implements OnInit {


  curriculum:any;
  currentUser: boolean;
  userName:string;
  loading:boolean;

  currentView: views = views.skills;


  constructor(private _msgService: MsgService,private _accountService: AccountService, private route: ActivatedRoute,
    private titleService: Title) {

    route.params.subscribe(params=>{
      this.userName = params['username'];
      this.loadProfile();
    });

  }

  public get getViews(): typeof views {
    return views; 
  }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(){
    this.loading = true;
    this._accountService.getProfile(this.userName?this.userName:'')
    .subscribe({
      next: (req:Request) => {
         if(req.succeeded){
            this.curriculum = req.result.curriculum;
            this.currentUser = req.result.currentUser;
            this.titleService.setTitle(req.result.fullName);
         }
      }
      ,error: (e) =>{
        console.log(e);
      }
    }).add(()=>this.loading = false);
  }


}
