import { Injectable } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  private readonly LIFE = 3000;

constructor(
  private messageService: MessageService,
  ) { }

  addMessage(messageData: Message) {

    if (!messageData.life) messageData.life = this.LIFE;

    this.messageService.add(messageData);
  }

  unsubscribe(sub$: Subject<void>) {
    sub$.next();
    sub$.complete();
  }

}
