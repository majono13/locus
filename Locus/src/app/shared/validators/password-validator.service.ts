import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PasswordValidatorService {

constructor() { }

  confirmPasswordValidator(matchTo: string): (control: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control.parent;
      if (!formGroup) return null; // Certifique-se de que o controle tem um pai
  
      const password = formGroup.get(matchTo)?.value;
      const confirmPassword = control.value;
  
      if (password !== confirmPassword) {
        return { passwordMismatch: true };
      }

      if (formGroup.get(matchTo).hasError('passwordMismatch')) {
        formGroup.get(matchTo).setErrors(null);
      }
  
      return null;
    };
  }

}
