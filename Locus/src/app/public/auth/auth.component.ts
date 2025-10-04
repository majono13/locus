import { Component, OnInit } from '@angular/core';
import { LoginComponent } from './login/login.component';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
    standalone: true,
    imports: [LoginComponent]
})
export class AuthComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
