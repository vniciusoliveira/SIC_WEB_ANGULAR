import { query } from '@angular/animations';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SendCidService {

  constructor() { }

  async cadastraCid(cid:string, desc:string, matricula: string): Promise<boolean>{

    const body = {
      CID:cid,
      DESC:desc,
      MATRICULA:matricula
    }

    console.log(JSON.stringify(body));

    return await window.fetch("http://adm.tmkt.servicos.mkt/API_SICWEB/api/CadastrarCID",{
      method:'POST',
      headers:{
        'content-type':'application/json;charset=UTF-8'
      },
      body: JSON.stringify(body)
    })
    .then(()=>{
      return true;
    })
    .catch((err) =>{
      console.error(err);
      return false;
    })
  }

}
