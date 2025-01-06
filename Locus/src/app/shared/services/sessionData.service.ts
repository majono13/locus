import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from 'src/app/core/models/user/user.model';
import { UtilsService } from './utils.service';
import { StorageKeyEnum } from 'src/app/core/enums/storage-keys.enum';

@Injectable({
  providedIn: 'root'
})
export class SessionDataService {

  user?: IUser;
  userSub$ = new BehaviorSubject<IUser | null>(null);

  constructor(private utilsService: UtilsService) {
    this.userSub$.subscribe(user => this.user = user);
    this.getUser();
  }

  private getUser() {
    const active = this.utilsService.getStorage(StorageKeyEnum.ACTIVE);
    let user: IUser | null = null;
    if (active !== null && active !== undefined) {
      user = JSON.parse(active);
    }
    this.userSub$.next(user);
  }
}
