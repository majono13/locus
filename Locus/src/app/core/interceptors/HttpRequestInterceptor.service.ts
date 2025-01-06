import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/shared/services/storage.service';
import { StorageKeyEnum } from '../enums/storage-keys.enum';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestInterceptorService implements HttpInterceptor {

constructor(private storageService: StorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.storageService.get(StorageKeyEnum.TOKEN);
    
    if (token) {
      var headers = new HttpHeaders();

      headers = new HttpHeaders({
        Authorization: 'Bearer ' + token,
      });

      if (headers != null) {
        req = req.clone({ headers: headers });
      }
    }
    return next.handle(req);
  }

}
