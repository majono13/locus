import { Injectable } from '@angular/core';
import { ILogin } from '../../models/user/login.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ILoginResponse } from '../../models/user/login-response.model';
import { Observable, catchError, throwError } from 'rxjs';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { IUser } from '../../models/user/user.model';
import { EntityService } from '../entity.service';
import { StorageKeyEnum } from '../../enums/storage-keys.enum';
import { SessionDataService } from 'src/app/shared/services/sessionData.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService extends EntityService<IUser> {

constructor(
  protected override http: HttpClient,
  protected override utilsService: UtilsService,
  private sessionData: SessionDataService,
  private router: Router
  ) { 
    super(http, utilsService, '/user')
  }

  login(loginData: ILogin): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(`${this.entityUrl}/login`, loginData)
    .pipe(catchError(error => this.doError(error)));
  }
  
  updateUserInfo(data: IUser) {
    return this.http.put<IUser>(`${this.entityUrl}`, data)
    .pipe(catchError(error => this.doError(error)));
  }

  updatePassword(data: { currentPassword: string, newPassword: string }) {
    return this.http.put<IUser>(`${this.entityUrl}/update-password`, data)
    .pipe(catchError(error => this.doError(error)));
  }

  logout() {
    this.utilsService.clearStorage(StorageKeyEnum.ACTIVE);
    this.utilsService.clearStorage(StorageKeyEnum.TOKEN);
    this.sessionData.userSub$.next(null);
    this.router.navigate(['public', 'login']);
  }
}
