import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { PathService } from '../path/path.service';
import { CookieService } from 'ngx-cookie-service';
import { CodifyInfoService } from '../cookie/codify-info.service';
import { CookieSession } from '../cookie/cookie-service-session.service';


@Injectable({
  providedIn: 'root'
})
export class EloginService {

  erro: boolean = false;
  sucesso: boolean = false;

  constructor(private httpClient: HttpClient,
              private pathService:PathService,
              private cookieService:CookieSession,
              private codify:CodifyInfoService){}

  async login(dadosColaboradores: any): Promise<void> {
    const { matricula, senha } = dadosColaboradores;
    
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.pathService.getLoginPath(`/Operador?nrreg=${matricula}&senhausu=${senha}`)).subscribe({
        next:(res:any) => {
          this.cookieService.setCookie(this.codify.encodeContent('user'),this.codify.encodeContentJSON(res),1);
          this.cookieService.setCookie(btoa('matricula'),res['matricula'],1);
          resolve();
        },
        error:(err) => {
          alert(err['error']['mensagem']);
          reject(err);
        }
      })
    })
  }
}
