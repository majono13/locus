import { Component, OnInit } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from "./register/register.component";
import { NgIf, NgClass } from '@angular/common';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
    standalone: true,
    imports: [LoginComponent, NgIf, RegisterComponent, NgClass]
})
export class AuthComponent implements OnInit {

  isLogin: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  handleisLoggin() {
    this.isLogin = !this.isLogin;
  }
}
