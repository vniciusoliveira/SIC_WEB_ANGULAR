import { Injectable } from '@angular/core';
import { PathService } from './path/path.service';

@Injectable({
  providedIn: 'root'
})
export class RelatorioHomeOfficeAvaliativoServiceService {

  constructor(private path:PathService) { }


  async ConsultaConsultaMovCodigo():Promise<any> {
    try{
      const response = await fetch(this.path.getsicApiPath(`RelatorioHomeOffice/RetornaQuantidadeMovCodigo`))
      if(!response.ok){
        throw new Error("Erro ao realizar consulta movCodigo");
      } else {
        return response.json();
      }
    } catch (err) {
      console.error(err);
    }
  }

  async ConsultaRelatorioPremiacaoHomeOfficeAvaliativo(nrreg:string, movCodigo:string):Promise<any> {
    try{
      const response = await fetch(this.path.getsicApiPath(`RelatorioHomeOffice/BuscaRelatorioPremiacaoHome?movCodigo=${movCodigo}&nrreg=${nrreg}`))
      if(!response.ok){
        throw new Error("Erro ao realizar consulta Home Office");
      } else {
        return response.json();
      }
    } catch (err) {
      console.error(err);
    }
  }

}
