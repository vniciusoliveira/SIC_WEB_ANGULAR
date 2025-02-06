import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastroCidPagComponent } from './cadastro-cid-pag/cadastro-cid-pag.component';
import { ConsultaNotificacaoEloginComponent } from './consultaNotificacaoElogin/consulta-notificacao-elogin/consulta-notificacao-elogin.component';
import { RelatorioPremiacaoHomeOfficeAvaliativoComponent } from './relatorio-premiacao-home-office-avaliativo/relatorio-premiacao-home-office-avaliativo.component';
import { IndexComponent } from './index/index.component';
import { PermissaoAcessoEloginAntigoComponent } from './permissao-acesso-elogin-antigo/permissao-acesso-elogin-antigo.component';
import { HttpClientModule } from '@angular/common/http';
import { MedidaDisciplinarComponent } from './medida-disciplinar/medida-disciplinar.component';
import { LoginComponent } from './login/login.component';
import { ComissaoPresencaDiferencaArquivoComponent } from './comissao-presenca-diferenca-arquivo/comissao-presenca-diferenca-arquivo.component';
import { ConsultaChatComponent } from './consulta-chat/consulta-chat.component';
import { InovAIComponent } from './inovAI/inov-ai.component';  // Importe o componente InovAI

@NgModule({
  declarations: [
    AppComponent,
    CadastroCidPagComponent,
    ConsultaNotificacaoEloginComponent,
    RelatorioPremiacaoHomeOfficeAvaliativoComponent,
    IndexComponent,
    PermissaoAcessoEloginAntigoComponent,
    MedidaDisciplinarComponent,
    LoginComponent,
    ComissaoPresencaDiferencaArquivoComponent,
    ConsultaChatComponent,
    InovAIComponent  // Declare o componente InovAI
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  providers: [
    provideNgxMask()  // Incluindo ngx-mask no provider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
