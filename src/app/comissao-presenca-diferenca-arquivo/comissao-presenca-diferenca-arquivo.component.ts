import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConsultaNotificacaoService } from 'src/services/consulta-notificacao.service';
import { CookieSession } from 'src/services/cookie/cookie-service-session.service';
import { PremiacaoQueFazADiferencaServiceService } from '../../services/Comissao/premiacao-que-faz-adiferenca-service.service';
import { Observable } from 'rxjs';
import { error } from 'pdf-lib';

@Component({
  selector: 'app-comissao-presenca-diferenca-arquivo',
  templateUrl: './comissao-presenca-diferenca-arquivo.component.html',
  styleUrls: ['./comissao-presenca-diferenca-arquivo.component.css']
})
export class ComissaoPresencaDiferencaArquivoComponent {
  mensagemErro:string="";
  nrreg: string="";
  carregamento: boolean=false;

  vigencia:any;

  vpe_codigo:string = ''


  constructor(private route:ActivatedRoute,
              private cookieSession:CookieSession,
              private premiacaoQueFazADiferencaServiceService:PremiacaoQueFazADiferencaServiceService
  ){}

  ngOnInit(): void {
    if(!this.cookieSession.IsLogged()){this.cookieSession.redirectLoginSICWEB();};
    if(this.cookieSession.checkCookieCodify('user')){
      let obj:any = this.cookieSession.getCookieDecodifyParameterCodify(('user'));
      this.nrreg = obj['ope_nrreg'];
    } else if (this.cookieSession.checkCookieBtoa('matricula')){
      this.nrreg = this.cookieSession.getCookie(btoa('matricula')).toString();
    }
    this.getVigencia();
  }

  getVigencia() {
    this.premiacaoQueFazADiferencaServiceService.getVigencia().subscribe({
      next: (res) => {
        this.vigencia = res;
        console.log(this.vigencia);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  async onSubmit(){
    this.carregamento = !this.carregamento;
    const nrreg = (document.getElementsByName('nrreg')[0] as HTMLInputElement).value;
    const dataInicial = (document.getElementsByName('dtini')[0] as HTMLInputElement).value;
    const dataFinal = (document.getElementsByName('dtend')[0] as HTMLInputElement).value;
    //await this.consultaService.ConsultaNotificacao(nrreg, dataInicial, dataFinal);
    this.carregamento = !this.carregamento;
  }

  consultar() {
    this.premiacaoQueFazADiferencaServiceService.getArquivo(this.vpe_codigo).subscribe({
      next: (res) => {
        // Criar blob a partir da resposta
        const blob = new Blob([res], { type: 'text/csv' });
        
        // Criar URL temporária para o blob
        const url = window.URL.createObjectURL(blob);
        
        // Criar elemento <a> para download
        const link = document.createElement('a');
        link.href = url;
        link.download = `premiacao_diferenca_${this.vpe_codigo}.csv`; // Nome do arquivo
        
        // Adicionar link ao documento, clicar e remover
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Liberar URL
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
