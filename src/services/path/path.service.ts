import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PathService {


    private loginPath:string = "http://elogin.tmkt.servicos.mkt/api_elogin/api";
    //  private loginPath:string = "http://localhost:5026/api";

    // private sicApiPath:string = "http://adm.tmkt.servicos.mkt/API_SICWEB/api/"
    private sicApiPath:string = "https://localhost:7007/api/";

  constructor() { }

  getLoginPath(complemento:string = ""):string { return this.loginPath+complemento; }
  getsicApiPath(complemento:string = ""):string { return this.sicApiPath+complemento; }

}
