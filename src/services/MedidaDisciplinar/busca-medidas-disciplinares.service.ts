import { MedidaDisciplinaredidaDisciplinarAssinaturaGerente } from '../../models/medidaDisciplinarAssinaturaGerente';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { PathService } from '../path/path.service';
import { Observable } from 'rxjs';
import { MedidaDisciplinar } from 'src/models/medidaDisciplinar.model';
import { MedidaDisciplinarAssinaturaEmpregado } from 'src/models/medidaDisciplinarAssinaturaEmpregado';
import { MedidaDisciplinarAssinaturaTestemunha } from 'src/models/medidaDisciplinarAssinaturaTestemunha';


@Injectable({
  providedIn: 'root'
})
export class BuscaMedidasDisciplinaresService {


  constructor(private httpClient: HttpClient,
              private pathService:PathService) { }

  async getMedidaDisciplinar(matricula: string): Promise<MedidaDisciplinar[]>{
    return new Promise((resolve, reject)=>{
      const apiUrl = this.pathService.getsicApiPath(`MedidaDisciplinar/GetMedidaDisciplinares?matricula=${matricula}`);
      this.httpClient.get(apiUrl).subscribe({
        next:(response)=>{
          const medidas = (response as any[]).map(item => new MedidaDisciplinar(item));
          resolve(medidas);
        },
        error:(err:any)=>{
          reject(err);
        }
      })
    })
  }

  async getAssinaturaGerente(mdrCodigo: Number){

    return new Promise((resolve, reject) => {
      const apiUrl = this.pathService.getsicApiPath(`MedidaDisciplinar/BuscaAssinaturaConfirmadaGerente?mdrCodigo=${mdrCodigo}`)
      this.httpClient.get(apiUrl).subscribe({
        next:(response) =>{
          const assinaturaGerente = new MedidaDisciplinaredidaDisciplinarAssinaturaGerente(response);
          resolve(assinaturaGerente)
        },
        error:(err:any)=>{
          reject(err);
        }
      })
    })
  }

  async getAssinaturaEmpregado(mdrCodigo: Number){

    return new Promise((resolve, reject) => {
      const apiUrl = this.pathService.getsicApiPath(`MedidaDisciplinar/BuscaAssinaturaConfirmadaEmpregado?mdrCodigo=${mdrCodigo}`)
      this.httpClient.get(apiUrl).subscribe({
        next:(response) =>{
          const assinaturaEmpregado = new MedidaDisciplinarAssinaturaEmpregado(response);
          resolve(assinaturaEmpregado)
        },
        error:(err:any)=>{
          reject(err);
        }
      })
    })
  }

  async getAssinaturaTestemunha(mdrCodigo: Number){

    return new Promise((resolve, reject) => {
      const apiUrl = this.pathService.getsicApiPath(`MedidaDisciplinar/BuscaAssinaturaConfirmadaTestemunha?mdrCodigo=${mdrCodigo}`)
      this.httpClient.get(apiUrl).subscribe({
        next:(response) =>{
          const assinaturaTestemunha = new MedidaDisciplinarAssinaturaTestemunha(response);
          resolve(assinaturaTestemunha)
        },
        error:(err:any)=>{
          reject(err);
        }
      })
    })
  }

  async PostDadosMedidaDisciplinar(tdsCodigo: number, MdrCodigo: number): Promise<MedidaDisciplinar> {
    return new Promise((resolve, reject) => {

      const body_req = {
        "TDS_CODIGO": tdsCodigo,
        "MDR_CODIGO": MdrCodigo
      };

      const headers_req = { 'content-type': 'application/json' };

      this.httpClient.post<any>(
        this.pathService.getsicApiPath("MedidaDisciplinar/GetInformationsEmployee"),
        body_req,
        { 'headers': new HttpHeaders(headers_req) }
      ).subscribe({
        next: (response: any) => {
          const dadosMedida = new MedidaDisciplinar(response);
          resolve(dadosMedida);
        },
        error: (err) => {
          reject(err);
        }
      });
    });
  }

  async validarGerente(cpf: string, dataNascimento: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const body_req = {
        "Nome": "",
        "NumCpf": cpf,
        "DtNasc": dataNascimento,
        "Nrreg": "",
        "valido": false
      };

      const headers_req = { 'content-type': 'application/json' };

      this.httpClient.post<any>(
        this.pathService.getsicApiPath("MedidaDisciplinar/ValidarGerente"),
        body_req,
        { 'headers': new HttpHeaders(headers_req) }
      ).subscribe({
        next: (response: any) => {
          resolve(response);
        },
        error: (err) => {
          reject(err);
        }
      });
    });
  }

  async validarEmpregado(cpf: string, dataNascimento: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const body_req = {
        "Nome": "",
        "NumCpf": cpf,
        "DtNasc": dataNascimento,
        "Nrreg": "",
        "valido": false
      };

      const headers_req = { 'content-type': 'application/json' };

      this.httpClient.post<any>(
        this.pathService.getsicApiPath("MedidaDisciplinar/ValidarEmpregado"),
        body_req,
        { 'headers': new HttpHeaders(headers_req) }
      ).subscribe({
        next: (response: any) => {
          resolve(response);
        },
        error: (err) => {
          reject(err);
        }
      });
    });
  }

  async validarTestemunha(cpf: string, dataNascimento: string): Promise<any>{
    return new Promise((resolve, reject)=>{
      const body_req ={
        "Nome": "",
        "NumCpf": cpf,
        "DtNasc": dataNascimento,
        "Nrreg": "",
        "valido": false
      };

      const headers_req = { 'content-type': 'application/json' };

      this.httpClient.post<any>(
        this.pathService.getsicApiPath("MedidaDisciplinar/ValidarTestemunha"),
        body_req,
        { 'headers': new HttpHeaders(headers_req) }
      ).subscribe({
        next: (response: any) => {
          resolve(response);
        },
        error: (err) => {
          reject(err);
        }
      })
    })
  }

  async confirmarAssinaturaGerente(assinaturaData: any): Promise<any>{
    return new Promise((resolve, reject) => {

      const body_req = {
        Mdd_Codigo: 0,
        MddGerenteContasNrreg: assinaturaData.nrreg,
        MddNomeGerenteContas: assinaturaData.nomeGerente,
        MddGerenteContasCpf: assinaturaData.cpfGerente,
        MddGerenteContasDtNasc: assinaturaData.dataNascimentoGerente,
        MddSmdCodigoGerenteContas: '0',
        MddMdrCodigo: assinaturaData.mdrCodigo,
        MddGerenteGeoLocalizacaoAssinatura: `${assinaturaData.MddGerenteGeoLocalizacaoAssinatura.latitude},${assinaturaData.MddGerenteGeoLocalizacaoAssinatura.longitude}`
      };

        const headers_req = { 'content-type': 'application/json' };

           this.httpClient.post<any>(
           this.pathService.getsicApiPath("MedidaDisciplinar/ConfirmaAssinaturaGerenteContas"),
           body_req,
           { 'headers': new HttpHeaders(headers_req) }
        ).subscribe({
          next: (response: any) => {
            resolve(response);
          },
          error(err) {
            reject(err);
          },
      });
    }
    );
  }

  async confirmarAssinaturaEmpregado(assinaturaDataEmpregado: any): Promise<any> {
    return new Promise((resolve, reject) => {

      const body_req = {
        "MddEmpregadoNrreg": assinaturaDataEmpregado.empregadoNrreg,
        "MddNomeEmpregado": assinaturaDataEmpregado.empregadoNome,
        "MddEmpregadoCPF": assinaturaDataEmpregado.empregadoCpf,
        "MddEmpregadoDtNasc": assinaturaDataEmpregado.dataNascimentoDoEmpregado,
        "MddEmpregadoSmdCodigo": '0',
        "MddMdrCodigo": assinaturaDataEmpregado.mdrCodigo,
        "MddEmpregadoGeoLocalizacaoAssinatura": `${assinaturaDataEmpregado.MddEmpregadoGeoLocalizacaoAssinatura.latitude},${assinaturaDataEmpregado.MddEmpregadoGeoLocalizacaoAssinatura.longitude}`
      };

      const headers_req = { 'content-type': 'application/json' };

      this.httpClient.post<any>(
        this.pathService.getsicApiPath("MedidaDisciplinar/ConfirmaAssinaturaEmpregado"),
        body_req,
        { 'headers': new HttpHeaders(headers_req) }
      ).subscribe({
        next: (response: any) => {
          resolve(response);
        },
        error: (err: HttpErrorResponse) => {
          console.error("Erro ao validar empregado:", err);
          if (err.status === 400 && err.error?.errors) {
            console.error("Detalhes do erro de validação:", err.error.errors);
          }
          reject(err);
        }
      });
    });
  }

  async confirmarAssinaturaTestemunha(assinaturaDataTestemunha: any): Promise<any> {
    return new Promise((resolve, reject) => {

      const body_req = {
        "MddTestemunhaNrreg": assinaturaDataTestemunha.testemunhaNrreg,
        "MddNomeTestemunha": assinaturaDataTestemunha.testemunhaNome,
        "MddTestemunhaCPF": assinaturaDataTestemunha.testemunhaCpf,
        "MddTestemunhaDtNasc": assinaturaDataTestemunha.dataNascimentoDaTestemunha,
        "MddTestemunhaSmdCodigo": '0',
        "MddMdrCodigo": assinaturaDataTestemunha.mdrCodigo,
        "MddTestemunhaGeoLocalizacaoAssinatura": `${assinaturaDataTestemunha.MddTestemunhaGeoLocalizacaoAssinatura.latitude},${assinaturaDataTestemunha.MddTestemunhaGeoLocalizacaoAssinatura.longitude}`
      };

      const headers_req = { 'content-type': 'application/json' };

      this.httpClient.post<any>(
        this.pathService.getsicApiPath("MedidaDisciplinar/ConfirmaAssinaturaTestemunha"),
        body_req,
        { 'headers': new HttpHeaders(headers_req) }
      ).subscribe({
        next: (response: any) => {
          resolve(response);
        },
        error: (err: HttpErrorResponse) => {
          console.error("Erro ao validar empregado:", err);
          if (err.status === 400 && err.error?.errors) {
            console.error("Detalhes do erro de validação:", err.error.errors);
          }
          reject(err);
        }
      });
    });
  }

}
