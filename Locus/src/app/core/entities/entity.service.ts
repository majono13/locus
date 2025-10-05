import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { environment } from 'src/environments/environment';

export class EntityService<T> {

  public readonly entityUrl = `${environment.URL_API}`;

constructor(
    protected http: HttpClient,
    protected utilsService: UtilsService,
    public url: string
  ) { 
    this.http = http;
    this.utilsService = utilsService;
    this.url = url;
    this.entityUrl += this.url;
  }

  getById(id: string) {
    return this.http.get<T>(`${this.entityUrl}/${id}`)
    .pipe(catchError(error => this.doError(error)));
  }

  protected doError(error: HttpErrorResponse ) {
    let message = "Erro desconhecido.";
    
    if (error?.error?.errors && Array.isArray(error?.error?.errors)) {
      message = error?.error?.errors.join("<br>");
    } else if (message = error?.error?.errors) {
      message = error?.error?.errors;
    }

    this.utilsService.addMessage({ severity: "error", summary: "Ocorreu um erro ao processar a requisição", detail: message });
    return throwError(() => new Error("Mensagem de erro!"));
  }

  create(entity: T) {
    return this.http.post<T>(`${this.entityUrl}`, entity)
    .pipe(catchError(error => this.doError(error))) as Observable<T>;
  }


}
