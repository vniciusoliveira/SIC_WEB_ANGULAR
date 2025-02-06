import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PathService } from '../path/path.service';
import { Observable } from 'rxjs';
import { premiacaoQueFazADiferenca } from '../../models/premiacaoDiferencaVigencia';

@Injectable({
  providedIn: 'root'
})
export class PremiacaoQueFazADiferencaServiceService {

  constructor(
      private httpClient:HttpClient,
      private pathService:PathService
  ) { }


  public getVigencia(): Observable<premiacaoQueFazADiferenca[]> {
    return this.httpClient.get<premiacaoQueFazADiferenca[]>(
      this.pathService.getsicApiPath("PresencaQueFazADiferenca/VigenciaPresencaQueFazADiferenca")
    );
  }



  getArquivo(vpe_codigo: string) {
    return this.httpClient.get(`${this.pathService.getsicApiPath()}PresencaQueFazADiferenca/GetArquivoCSV?vpe_codigo=${vpe_codigo}`, 
      { responseType: 'blob' }
    );
  }
}
