import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importe os componentes
import { PermissaoAcessoEloginAntigoComponent } from './permissao-acesso-elogin-antigo/permissao-acesso-elogin-antigo.component';
import { CadastroCidPagComponent } from './cadastro-cid-pag/cadastro-cid-pag.component';
import { ConsultaNotificacaoEloginComponent } from './consultaNotificacaoElogin/consulta-notificacao-elogin/consulta-notificacao-elogin.component';
import { RelatorioPremiacaoHomeOfficeAvaliativoComponent } from './relatorio-premiacao-home-office-avaliativo/relatorio-premiacao-home-office-avaliativo.component';
import { IndexComponent } from './index/index.component';
import { MedidaDisciplinarComponent } from './medida-disciplinar/medida-disciplinar.component';
import { LoginComponent } from './login/login.component';
import { ComissaoPresencaDiferencaArquivoComponent } from './comissao-presenca-diferenca-arquivo/comissao-presenca-diferenca-arquivo.component';
import { ConsultaChatComponent } from './consulta-chat/consulta-chat.component';
import { InovAIComponent } from './inovAI/inov-ai.component';  // Adapte o caminho conforme necessário

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'redirect', component: IndexComponent },
  { path: 'cadastroCid', component: CadastroCidPagComponent },
  { path: 'consultaNotificacao', component: ConsultaNotificacaoEloginComponent },
  { path: 'relatorioPremiacaoHomeOfficeAvaliativo', component: RelatorioPremiacaoHomeOfficeAvaliativoComponent },
  { path: 'PermissaoAcessoEloginAntigo', component: PermissaoAcessoEloginAntigoComponent },
  { path: 'medidaDisciplinar', component: MedidaDisciplinarComponent },
  { path: 'comissaoPremiacaoDiferencaArquivo', component: ComissaoPresencaDiferencaArquivoComponent },
  { path: 'consultaChat', component: ConsultaChatComponent },
  { path: 'inovAI', component: InovAIComponent },  // Rota para o componente InovAI
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
