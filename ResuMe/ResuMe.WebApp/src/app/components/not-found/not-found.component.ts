import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  host:{class:"center"},
})
export class NotFoundComponent implements OnInit {

  isSigned:boolean;

  constructor(private titleService: Title,private _authService: AuthService) {
    this.titleService.setTitle("Error 404");
    this.isSigned = _authService.isSigned;
  }

  ngOnInit(): void {
  }

}
