import { Component, ChangeDetectorRef, OnInit} from '@angular/core';
import { PermissaoAcessoEloginAntigoService } from 'src/services/PermissaoAcessoEloginAntigo/permissao-acesso-elogin-antigo.service';
import Swal from 'sweetalert2';
import { CookieSession } from '../../services/cookie/cookie-service-session.service';


export interface ColaboradorInfos {
  matricula: string;
  nome: string;
  cr: string;
  DtNasc: string;
  NumCpf: string;
  matriculaSupervisor: string;
  motivoDesbloqueio: string;
  CgoCodigo:number;
  CgoDescricao: string;
}

@Component({
  selector: 'app-permissao-acesso-elogin-antigo',
  templateUrl: './permissao-acesso-elogin-antigo.component.html',
  styleUrls: ['./permissao-acesso-elogin-antigo.component.css']
})
export class PermissaoAcessoEloginAntigoComponent implements OnInit{

  constructor(
    private dadosOperador: PermissaoAcessoEloginAntigoService,
    private cdr: ChangeDetectorRef,
    private cookieSession:CookieSession
  ) {}

  isDivVisible = false;
  isBottomVisible = true;
  warningError = false;
  nrreg: string="";
  matricula = '';
  colaboradorInfos: ColaboradorInfos | null = null;

  ngOnInit(): void {
    if(!this.cookieSession.IsLogged()){this.cookieSession.redirectLoginSICWEB();};
    if(this.cookieSession.checkCookieCodify('user')){
      let obj:any = this.cookieSession.getCookieDecodifyParameterCodify(('user'));
      this.nrreg = obj['ope_nrreg'];
    } else if (this.cookieSession.checkCookieBtoa('matricula')){
      this.nrreg = this.cookieSession.getCookie(btoa('matricula')).toString();
    }
  }

  async onSubmit() {
    if (!this.matricula.trim()) {
      this.warningError = true;
      return;
    }
    this.warningError = false;
    try {
      const dados = await this.dadosOperador.getDadosOperador(this.matricula);
      this.colaboradorInfos = dados;
      if(this.colaboradorInfos){
        this.colaboradorInfos["DtNasc"] = "";
        this.colaboradorInfos.NumCpf = "";
      }
      this.isDivVisible = true;
      this.isBottomVisible = false;
    } catch (error) {
      console.error('Erro ao chamar o serviço', error);
      this.warningError = true;
    }
  }

  confirmaDesbloqueioOperador(data: ColaboradorInfos) {
    Swal.fire({
      title: 'Tem certeza?',
      text: "Você está prestes a confirmar o desbloqueio!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#25854d',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, confirmar!',
      cancelButtonText: 'Cancelar',
      iconColor: '#25854d'
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          this.dadosOperador.insereDesbloqueioOperador(data)
            .then(() => {
              Swal.fire({
                title: 'Desbloqueado com sucesso!',
                text: 'O colaborador está com acesso ao E-Login antigo.',
                icon: 'success',
                confirmButtonColor: '#25854d',
                confirmButtonText: 'Ok'
              }
              );
            })
            .catch((error) => {
              Swal.fire({
                title: 'Error',
                text: 'Ocorreu um erro ao desbloquear o operador.',
                icon: 'error',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#25854d',
              },
              );
              console.error('Erro ao confirmar o desbloqueio', error);
            });
        } catch (error) {
          console.error('Erro ao confirmar o desbloqueio', error);
        }
      }
    });
  }

  toggleDivVisibility() {
    if (this.matricula.trim() === '') {
      this.warningError = true;
      this.isDivVisible = false;
    } else {
      this.warningError = false;
      this.isDivVisible = true;
      this.isBottomVisible = false;
    }
  }

  resetVisibility() {
    this.isDivVisible = false;
    this.isBottomVisible = true;
    this.warningError = false;
    this.matricula = '';
    this.colaboradorInfos = null;
  }
}
