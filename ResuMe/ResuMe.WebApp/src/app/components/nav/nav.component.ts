import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsgService } from 'src/app/services/msg.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  isSigned: boolean;
  userName: string;

  constructor(private _authService: AuthService, private router: Router, private _msgService: MsgService) {
    
    this.isSigned = _authService.isSigned;

    this.userName = localStorage.getItem("userName");

    _msgService.$emitterUserNameChanged.subscribe(user => {
      this.userName = user.userName;
    });

   }

  ngOnInit(): void {

  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
