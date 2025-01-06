import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { StorageService } from 'src/app/shared/services/storage.service';
import { StorageKeyEnum } from '../enums/storage-keys.enum';
import { IUser } from '../models/user/user.model';
import { UserTypeEnum } from '../enums/user-type.enum';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService {

constructor(
  private utilsService: UtilsService,
  private router: Router,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const active = this.utilsService.getStorage(StorageKeyEnum.ACTIVE);

    if (active) {
      const user: IUser = JSON.parse(active);

      if (user.type === UserTypeEnum.COMMUN) {
        this.router.navigate(['public', 'commun'])
      } else {
        this.router.navigate(['admin']);
      }

      return of(false);
    }
    return of(true);
  }

}
