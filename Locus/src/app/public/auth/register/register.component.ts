import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { InputValidatorComponent } from 'src/app/shared/components/input-validator/input-validator.component';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { PasswordValidatorService } from 'src/app/shared/validators/password-validator.service';
import { UserService } from 'src/app/core/entities/user/User.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { firstValueFrom } from 'rxjs';
import { UserTypeEnum } from 'src/app/core/enums/user-type.enum';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, InputValidatorComponent, InputTextModule, DividerModule, ButtonModule, IconFieldModule, InputIconModule]
})
export class RegisterComponent implements OnInit {

  @Output() onLogin = new EventEmitter();

  form: FormGroup;
  inputsPassword = [false, false];
  onLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private passwordValidatorService: PasswordValidatorService,
    private userService: UserService,
    private utilsService: UtilsService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    const passwordValidator = this.passwordValidatorService;

    this.form = this.fb.group({
      name: [null, [Validators.required, Validators.maxLength(250)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6), passwordValidator.confirmPasswordValidator('confirmPassword')]],
      confirmPassword: [null, [Validators.required, Validators.minLength(6), passwordValidator.confirmPasswordValidator('password')]],
      type: [UserTypeEnum.COMMUN]
    });
  }

  backToLogin() {
    this.onLogin.emit();
  }

  showPassword(index: 0 | 1, element: HTMLInputElement) {
    const currentValue = this.inputsPassword[index];
    element.type = !currentValue ? 'text' : 'password';

    this.inputsPassword[index] = !this.inputsPassword[index];
  }

  onSave() {
    if (this.form.valid) {
      this.save();
    } else {
      this.form.markAllAsTouched();
    }
  }

  private async save() {
    this.onLoading = true;
    try {
      const form = this.form.getRawValue();

      const response = await firstValueFrom(this.userService.createUser(form));
      await this.userService.doAuthenticated(response);
    } catch(err) {
      console.error(err);
    }
    this.onLoading = false;
  }
}
