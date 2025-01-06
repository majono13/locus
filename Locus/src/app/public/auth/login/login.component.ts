import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from 'src/app/core/entities/user/User.service';
import { ILoginResponse } from 'src/app/core/models/user/login-response.model';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private utilsService: UtilsService,
    private userService: UserService
    ) { 
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  login() {
    if (this.form.valid) {
      const form = this.form.getRawValue();
      this.userService.login(form).pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => this.doAuthenticated(response)
      });
      ;
    } else {
      this.form.markAsTouched();
    }
  }

  private doAuthenticated(loginResponse: ILoginResponse) {
    console.log(loginResponse)
  }
}
