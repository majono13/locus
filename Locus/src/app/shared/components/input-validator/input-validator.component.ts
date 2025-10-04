import { AfterContentInit, Component, ContentChild, OnInit } from '@angular/core';
import { FormControlName, NgModel } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
    selector: 'input-validator',
    templateUrl: './input-validator.component.html',
    styleUrls: ['./input-validator.component.scss'],
    standalone: true,
    imports: [NgIf]
})
export class InputValidatorComponent implements OnInit, AfterContentInit {

  input: NgModel | FormControlName;
  constructor() {}

  ngOnInit(): void {}

  get errorMessage(): string {
    try {
      if (this.input.errors == null) return null;
      else {
        var key = Object.keys(this.input.errors)[0];
        const error = this.input.errors[key];
        switch (key) {
          case 'required':
            return 'O campo é obrigatório';
          case 'minlength':
            return `Campo deve conter no mínimo ${error.requiredLength} caracteres`;
          case 'maxlength':
            return `Campo deve conter no máximo ${error.requiredLength} caracteres`;
          case 'email':
            return 'Formato de e-mail inválido.';
          case 'passwordMismatch':
            return 'As senhas devem ser iguais';
          default: return 'Campo inválido.'
        }
      }
    } catch (error) {
      return null;
    }
  }

  @ContentChild(NgModel) model!: NgModel;
  @ContentChild(FormControlName) control: FormControlName | undefined;

  ngAfterContentInit() {
    this.input = this.model || this.control;
    if (this.input === undefined) {
      throw new Error(
        'Esse componente precisa ser usado com uma diretiva ngModel ou FormControlName'
      );
    }
  }

}
