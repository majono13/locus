import { Injectable } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  private readonly LIFE = 3000;

constructor(
  private messageService: MessageService,
  private localStorageService: StorageService
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
  this.localStorageService.get(key);
}

clearStorage(key: string) {
  this.localStorageService.clear(key);
}

}
