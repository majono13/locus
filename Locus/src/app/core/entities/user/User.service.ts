import { Injectable } from '@angular/core';
import { ILogin } from '../../models/user/login.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ILoginResponse } from '../../models/user/login-response.model';
import { Observable, catchError, throwError } from 'rxjs';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly entityUrl = `${environment.URL_API}/user`;

constructor(
  private http: HttpClient,
  private utilsService: UtilsService
  ) { }

  login(loginData: ILogin): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(`${this.entityUrl}/login`, loginData)
    .pipe(catchError(error => this.doError(error)));
  }

  private doError(error: HttpErrorResponse ) {
    let message = "Erro desconhecido.";
    
    if (error?.error?.errors && Array.isArray(error?.error?.errors)) {
      message = error?.error?.errors.join("<br>");
    } else if (message = error?.error?.errors) {
      message = error?.error?.errors;
    }

    this.utilsService.addMessage({ severity: "error", summary: "Ocorreu um erro ao processar a requisição", detail: message });
    return throwError(() => new Error("Mensagem de erro!"));
  }

}
