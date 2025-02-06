import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CodifyInfoService } from './codify-info.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CookieSession {

  constructor(private cookieService:CookieService,
              private codify:CodifyInfoService,
              private router:Router
  ) { }

  setCookie(keyParam:string,valueParam:string,expireParam:number):void{
    if(!this.checkCookie(keyParam)){
      this.cookieService.set(keyParam,valueParam,expireParam);
    }
  }

  checkCookie(param:string):boolean{
    return this.cookieService.check(param);
  }
  checkCookieBtoa(param:string):boolean{
    return this.cookieService.check(btoa(param));
  }
  checkCookieCodify(param:string):boolean{
    return this.cookieService.check(this.codify.encodeContent(param));
  }

  getCookie(param:string):Object{
    return this.cookieService.get(param);
  }
  getCookieDecodify(param:string):Object{
    return this.codify.decodeContentJSON(this.cookieService.get(param));
  }
  getCookieDecodifyParameterCodify(param:string):Object{
    return this.codify.decodeContentJSON(this.cookieService.get(this.codify.encodeContent(param)));
  }

  deleteCookie(param:string):void{
    this.cookieService.delete(param);
  }

  clearCookie():void{
    this.cookieService.deleteAll();
  }

  IsLogged():boolean{ // Esta função ve se a pessoa está logando com um usuario completo ou simplesmente a matricula
    return (this.checkCookie(btoa('matricula')) || this.checkCookie(this.codify.encodeContent('user')));
  }
  
  IsLoggedUser():boolean{ // Esta função verifica se tem o usuario completo logado 
    return this.checkCookie(this.codify.encodeContent('user'));
  }

  redirectLoginSICWEB():void{window.location.href = 'http://admweb.tmkt.servicos.mkt/SIC_WEB/LOGIN.ASPX';}
  redirectLoginSICWEBANG():void{this.router.navigate(['/']);}
}
