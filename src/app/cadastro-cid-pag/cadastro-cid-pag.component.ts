import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SendCidService } from '../../services/send-cid.service';
import { CookieSession } from '../../services/cookie/cookie-service-session.service';

@Component({
  selector: 'app-cadastro-cid-pag',
  templateUrl: './cadastro-cid-pag.component.html',
  styleUrls: ['./cadastro-cid-pag.component.css']
})
export class CadastroCidPagComponent implements OnInit {
  mensagemErro:string="";
  nrreg: string="";
  carregamento: boolean=false;

  constructor(private route: ActivatedRoute,
              private cidService: SendCidService,
              private cookieSession:CookieSession){

  }

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
    const cid = (document.getElementsByName('cid')[0] as HTMLInputElement).value;
    const desc = (document.getElementsByName('desc')[0] as HTMLTextAreaElement).value;
    if (await this.cidService.cadastraCid(cid,desc,this.nrreg)){
      alert("CID Gravado com sucesso!");
    } else {
      alert("Ocorreu um erro, tente novamente mais tarde.");
    }
    this.carregamento = !this.carregamento;
  }
}
