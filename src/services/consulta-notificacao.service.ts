import { Injectable } from '@angular/core';
import { PathService } from './path/path.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaNotificacaoService {

  constructor(private path:PathService,
              private httpClient:HttpClient
  ) { }

  async ConsultaNotificacao(nrreg:string, dataInicial:string, dataFinal:string):Promise<any> {
    try{

      const body = {
        NRREG:nrreg,
        DTINI:dataInicial,
        DTEND:dataFinal
      }

      const response = await fetch(this.path.getsicApiPath("ConsultaNotificacao"),{
        method:'POST',
        headers:{
          'content-type':'application/json;charset=UTF-8'
        },
        body: JSON.stringify(body)})
      if(!response.ok){
        throw new Error("Erro ao realizar consulta");
      }

      // Criar um blob a partir da resposta
      const data = await response.blob();

      // Criar um URL para o blob
      const downloadUrl = window.URL.createObjectURL(data);

      // Criar um elemento <a> temporário e programaticamente clicar nele para iniciar o download
      const a = document.createElement("a");
      let nomeArquivo = `notif_${nrreg}_${dataInicial}_ate_${dataInicial}`
      a.href = downloadUrl;
      a.download = `${nomeArquivo}.xlsx`; // Definir um nome para o arquivo a ser baixado
      document.body.appendChild(a); // Anexar o elemento ao corpo do documento para que possa ser clicado
      a.click(); // Simular um clique no link para iniciar o download

      // Limpeza: remover o elemento <a> e liberar o URL de objeto
      document.body.removeChild(a);
      window.URL.revokeObjectURL(downloadUrl);


    } catch (err) {
      console.error(err);
    }
  }

  getChat(matricula:string, body:Object):Observable<any>{

    let destinatario = (body as any).destinatario === '' ? '' : `&destinatario=${(body as any).destinatario}`;
    let dataInicio = (body as any).dataInicio === '' ? '' : `&dataInicio=${(body as any).dataInicio}`;
    let datafim = (body as any).dataFim === '' ? '' : `&datafim=${(body as any).dataFim}`;

    return this.httpClient.get(this.path.getsicApiPath(`Juridico/GetRelatorioChat?matricula=${(body as any).remetente}&matriculaLog=${matricula}${destinatario + dataInicio + datafim}`))
  }

  async getChatArquivo(matricula:string, body:Object){

    let destinatario = (body as any).destinatario === '' ? '' : `&destinatario=${(body as any).destinatario}`;
    let dataInicio = (body as any).dataInicio === '' ? '' : `&dataInicio=${(body as any).dataInicio}`;
    let datafim = (body as any).dataFim === '' ? '' : `&datafim=${(body as any).dataFim}`;

    this.httpClient.get(this.path.getsicApiPath(`Juridico/GetRelatorioChatArquivo?matricula=${(body as any).remetente}&matriculaLog=${matricula}${destinatario + dataInicio + datafim}`), { responseType: 'blob'}).subscribe({
      next:(res:Blob) => {
        const blobUrl = window.URL.createObjectURL(res);
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = 'relatorioChat.xlsx';
        a.click();

        window.URL.revokeObjectURL(blobUrl);
      },
      error:(err) => {
        console.error(err);
      }
    });
  }

}
