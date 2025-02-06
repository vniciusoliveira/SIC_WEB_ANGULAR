import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConsultaNotificacaoService } from 'src/services/consulta-notificacao.service';
import { CookieSession } from '../../../services/cookie/cookie-service-session.service';

@Component({
  selector: 'app-consulta-notificacao-elogin',
  templateUrl: './consulta-notificacao-elogin.component.html',
  styleUrls: ['./consulta-notificacao-elogin.component.css']
})
export class ConsultaNotificacaoEloginComponent {

  mensagemErro:string="";
  nrreg: string="";
  carregamento: boolean=false;

  constructor(private route:ActivatedRoute,
              private consultaService:ConsultaNotificacaoService,
              private cookieSession:CookieSession
  ){}

  ngOnInit(): void {
    if(!this.cookieSession.IsLogged()){this.cookieSession.redirectLoginSICWEB();};
    if(this.cookieSession.checkCookieCodify('user')){
      let obj:any = this.cookieSession.getCookieDecodifyParameterCodify(('user'));
      this.nrreg = obj['ope_nrreg'];
    } else if (this.cookieSession.checkCookieBtoa('matricula')){
      this.nrreg = this.cookieSession.getCookie(btoa('matricula')).toString();
    }
  }

  async onSubmit(){
    this.carregamento = !this.carregamento;
    const nrreg = (document.getElementsByName('nrreg')[0] as HTMLInputElement).value;
    const dataInicial = (document.getElementsByName('dtini')[0] as HTMLInputElement).value;
    const dataFinal = (document.getElementsByName('dtend')[0] as HTMLInputElement).value;
    await this.consultaService.ConsultaNotificacao(nrreg, dataInicial, dataFinal);
    this.carregamento = !this.carregamento;
  }
}

