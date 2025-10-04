import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { DIALOG_CONFIG } from 'src/app/core/consts/default-dialog-config.const';
import { UtilsService } from '../../services/utils.service';
import { StorageKeyEnum } from 'src/app/core/enums/storage-keys.enum';
import { UserService } from 'src/app/core/entities/user/User.service';
import { IUser } from 'src/app/core/models/user/user.model';
import { Subject, firstValueFrom, takeUntil } from 'rxjs';
import { TabView } from 'primeng/tabview';
import { AccountTabsEnum } from 'src/app/core/enums/account-tabs.enum';
import { PasswordValidatorService } from '../../validators/password-validator.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, OnDestroy {

  @ViewChild('tabView') tabView: TabView;
  @Input() visible: boolean = true;
  @Output() close = new EventEmitter();

  formInfo: UntypedFormGroup;
  formPassword: UntypedFormGroup;
  destroy$ = new Subject<void>();
  loading: boolean = false;
  activeIndex: number = 0;

  readonly dialogConfig = DIALOG_CONFIG;
  readonly tabs = AccountTabsEnum;

  constructor(
    private fb: UntypedFormBuilder,
    private utilsService: UtilsService,
    private userService: UserService,
    private passwordValidatorService: PasswordValidatorService
    ) { 
    this.initForms();
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.utilsService.unsubscribe(this.destroy$);
  }


  private initForms() {
    this.formInfo = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      type: [null]
    });

    const passwordValidator = this.passwordValidatorService;
    this.formPassword = this.fb.group({
      currentPassword: [null, [Validators.required, Validators.minLength(6)]],
      newPassword: [null, [Validators.required, Validators.minLength(6), passwordValidator.confirmPasswordValidator('newPassword2')]],
      newPassword2: [null, [Validators.required, Validators.minLength(6), passwordValidator.confirmPasswordValidator('newPassword')]],
    });

    this.setInfo();
  }

  async onSave() {
    if (this.formInfo.dirty || this.formPassword.dirty) {
      this.utilsService.confirm({
        header: 'Atualizar dados',
        message: 'Ao atualizar os dados do usuário será necessário realizar um novo login. Deseja continuar?',
        accept: () => this.save(),
        reject: () => {}
      });

    } else {
      this.onClose();
    }
  }

  private async save() {
    
    if (this.formInfo.dirty && this.formInfo.valid) {
      this.loading = true;
      await this.updateUserInfo();
      return;
    } else if (this.formInfo.dirty) {
      this.formInfo.markAllAsTouched();
      return;
    }

    if (this.formPassword.dirty && this.formPassword.valid) {
      this.loading = true;
      await this.updatePassword();
      return;
    } else if (this.formPassword.dirty) {
      this.formPassword.markAllAsTouched();
      return;
    }

    this.onClose();
  }

  private async updateUserInfo() {
    const user: IUser = this.formInfo.getRawValue();
    await firstValueFrom(this.userService.updateUserInfo(user))
    .then(() => {
      this.loading = false;
      this.showMessage('success', 'Informações do usuário atualizadas', 'As informações do usuário foram atualizadas com sucesso.');
      this.logout();
    }).catch(() => this.loading = false);
  }

  private async updatePassword() {
    const form = this.formPassword.getRawValue();
    const data = {
      currentPassword: form.currentPassword,
      newPassword: form.newPassword
    }

    await firstValueFrom(this.userService.updatePassword(data))
    .then(() => {
      this.loading = false;
      this.showMessage('success', 'Senha atualizada', 'A senha foi atualizada com sucesso.');
      this.logout();
    }).catch(() => {
      this.loading = false;
    });
  }

  verifyForm(index: number) {
    let form: UntypedFormGroup;
    let tabName = '';
    const activeIndexCopy = this.activeIndex;

    if (index === 1 && this.formInfo.dirty) {
      tabName = AccountTabsEnum.INFO;
      form = this.formInfo;
    } else if (index === 0 && this.formPassword.dirty) {
      tabName = AccountTabsEnum.PASSWORD;
      form = this.formPassword;
    }

    if (form) {
      this.utilsService.confirm({
        header: 'Dados não salvos',
        message: `As alterações da aba "${tabName}" não foram salvar. Você perderá as alterações feitas. Deseja continuar?`,
        accept: () => this.resetForm(form, tabName === AccountTabsEnum.INFO),
        reject: () => {
          setTimeout(() => this.activeIndex = activeIndexCopy, 100)
        }
      });
    }
  }

  private resetForm(form: UntypedFormGroup, isInnfoForm: boolean) {
    form.reset();

    if (isInnfoForm) this.setInfo();
  }

  private showMessage(severity: string, summary: string, detail: string) {
    this.utilsService.addMessage({severity: severity, summary: summary, detail: detail});
  }

  private setInfo() {
    const userString = this.utilsService.getStorage(StorageKeyEnum.ACTIVE);
    
    if (userString) {
      this.formInfo.patchValue(JSON.parse(userString));
    }
  }

  onClose() {
    this.close.emit();
  }

  private logout() {
    this.onClose();
    this.userService.logout();
  }

}
