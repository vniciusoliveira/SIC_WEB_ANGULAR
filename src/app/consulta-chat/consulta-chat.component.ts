import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatResponse } from 'src/models/ChatResponse';
import { ConsultaNotificacaoService } from 'src/services/consulta-notificacao.service';
import { CookieSession } from 'src/services/cookie/cookie-service-session.service';

@Component({
  selector: 'app-consulta-chat',
  templateUrl: './consulta-chat.component.html',
  styleUrls: ['./consulta-chat.component.css']
})
export class ConsultaChatComponent {
  
  mensagemErro:string="";
  nrreg: string="";
  carregamento: boolean=false;
  chatView:boolean=false;
  listChat:ChatResponse[] = [];

  constructor(private route:ActivatedRoute,
              private consultaService:ConsultaNotificacaoService,
              private cookieSession:CookieSession,
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
    const body = {
      remetente:(document.getElementsByName('inp_remetente')[0] as HTMLInputElement).value,
      destinatario:(document.getElementsByName('inp_destinatario')[0] as HTMLInputElement).value,
      dataInicio:(document.getElementsByName('dtini')[0] as HTMLInputElement).value,
      dataFim:(document.getElementsByName('dtend')[0] as HTMLInputElement).value
    }
    this.consultaService.getChat(this.nrreg, body).subscribe({
      next:(res: any[]) => {
        this.listChat = res.map(item => new ChatResponse(item));
        this.chatView = true;
      },
      error:(err) => {
        console.error(err);
      }
    });
    this.carregamento = !this.carregamento;
  }

  async onSubmitArquivo(){
    this.carregamento = !this.carregamento;
    const body = {
      remetente:(document.getElementsByName('inp_remetente')[0] as HTMLInputElement).value,
      destinatario:(document.getElementsByName('inp_destinatario')[0] as HTMLInputElement).value,
      dataInicio:(document.getElementsByName('dtini')[0] as HTMLInputElement).value,
      dataFim:(document.getElementsByName('dtend')[0] as HTMLInputElement).value
    }
    await this.consultaService.getChatArquivo(this.nrreg, body);
    this.carregamento = !this.carregamento;
  }

  fecharChatView(){
    this.chatView = false;
  }
}

