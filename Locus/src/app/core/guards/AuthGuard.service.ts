import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, map, of, tap } from 'rxjs';
import { UserService } from '../entities/user/User.service';
import { StorageKeyEnum } from '../enums/storage-keys.enum';
import { IUser } from '../models/user/user.model';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { SessionDataService } from 'src/app/shared/services/sessionData.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private userService: UserService, 
    private router: Router,
    private utilsService: UtilsService,
    private sessionData: SessionDataService
    ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const active = this.utilsService.getStorage(StorageKeyEnum.ACTIVE);

    if (active) {
      const user: IUser = JSON.parse(active);
      return this.userService.getById(user.id)
      .pipe(
        tap(user => { this.sessionData.userSub$.next(user) }),
        map(u => u?.id === user.id && u.active),
        tap(valid => {
          if (!valid) this.navigateToLogin();
        })
        );
    }
    this.navigateToLogin();
    return of(false);
  }

  private navigateToLogin() {
    this.utilsService.addMessage({ severity: 'error', 
    summary: 'Necessário estar autenticado', 
    detail:'Por favor faça login para continuar.' });

    this.utilsService.clearStorage(StorageKeyEnum.ACTIVE);
    this.utilsService.clearStorage(StorageKeyEnum.TOKEN);
    this.sessionData.userSub$.next(null)

    this.router.navigate(['public', 'login']);
  }

}
