import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PathService } from '../path/path.service';
import { ColaboradorInfos } from '../../app/permissao-acesso-elogin-antigo/permissao-acesso-elogin-antigo.component';


@Injectable({
  providedIn: 'root'
})
export class PermissaoAcessoEloginAntigoService {

  constructor(private path:PathService,
              private http: HttpClient
  ) {}

  async getDadosOperador(matricula: string):Promise<any> {
    try{
      const response = await fetch(this.path.getsicApiPath(`GetInformacoesColaborador/GetInfos?matricula=${matricula}`))
      if(!response.ok){
        throw new Error("Erro ao realizar consulta do Operador");
      } else {
        return response.json();
      }
    } catch (err) {
      console.error(err);
    }
  }

  async insereDesbloqueioOperador(data: ColaboradorInfos): Promise<any> {
    try {
      console.log(data);
      const response = await fetch(this.path.getsicApiPath("GetInformacoesColaborador/DesbloqueioOperador"), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro ao realizar a requisição: ${response.status} - ${errorText}`);
      }

      const responseText = await response.text();
      if (responseText) {
        return JSON.parse(responseText);
      } else {
        return {};
      }
    } catch (error) {
      console.error('Erro ao enviar dados para a API:', error);
      throw error;
    }
  }




  // insereDesbloqueioOperador(data: ColaboradorInfos): Observable<any> {
  //   const apiUrl = this.path.getsicApiPath('GetInformacoesColaborador/DesbloqueioOperador');
  //   return this.http.post(apiUrl, data).pipe(
  //     catchError(this.handleError)
  //   );
  // }


  private handleError(error: any): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro no lado do cliente
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      // Erro no lado do servidor
      errorMessage = `Código do erro: ${error.status}, mensagem: ${error.message}`;
    }
    return throwError(errorMessage);
  }

}

