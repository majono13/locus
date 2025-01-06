import { Injectable } from '@angular/core';
import { Confirmation, ConfirmationService, Message, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  private readonly LIFE = 3000;

constructor(
  private messageService: MessageService,
  private localStorageService: StorageService,
  private confirmationService: ConfirmationService
  ) { }

  addMessage(messageData: Message) {

    if (!messageData.life) messageData.life = this.LIFE;

    this.messageService.add(messageData);
  }

  unsubscribe(sub$: Subject<void>) {
    sub$.next();
    sub$.complete();
  }

  setStorage(key: string, value: any) {
  this.localStorageService.set(key, value);
  }

  getStorage(key: string) {
    return this.localStorageService.get(key);
  }

  clearStorage(key: string) {
    this.localStorageService.clear(key);
  }

  confirm(confirm: Confirmation) {
    const config: Confirmation = {
      rejectLabel: confirm.rejectLabel || 'Não',
      acceptLabel: confirm.acceptLabel || 'Sim',
      rejectButtonStyleClass: confirm.rejectButtonStyleClass || 'p-button-text text-danger',
      acceptButtonStyleClass: confirm.acceptButtonStyleClass || 'p-button-primary',
      acceptIcon: 'null',
      rejectIcon: 'null',
      defaultFocus: confirm.defaultFocus || 'accept',
      icon: confirm.icon ?? '',
      message: confirm.message,
      header: confirm.header,
      accept: confirm.accept,
      reject: confirm.reject,
      acceptVisible: confirm.acceptVisible === false ? false : true,
      rejectVisible: confirm.rejectVisible === false ? false : true,
    };

    return this.confirmationService.confirm(config);
  }

}
