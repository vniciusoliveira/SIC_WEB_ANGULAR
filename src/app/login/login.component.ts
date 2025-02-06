import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { EloginService } from 'src/services/elogin/elogin.service';
import { CookieSession } from '../../services/cookie/cookie-service-session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  matricula: string = '';
  senha: string = '';
  carregamento: boolean = false;
  sucesso: boolean = false;
  erro: boolean = false;
  mensagemErro: string = '';

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private loginService: EloginService,
    private cookieSession:CookieSession
  ) {}

  ngOnInit() : void{
      localStorage.clear();
      this.cookieSession.clearCookie();
      // this.isConnectAny = this.loginService.conexaoApi().subscribe(
      //   (response: any) => {
      //     // this.carregamentoUpdate()
      //     this.isConnect = true;
      //     // this.carregamentoUpdate()
      //   },
      //   (error) => {
      //     console.error('Erro na chamada da API:', error);
      //   }
      // )
  };

  async onSubmit(){
    // this.carregamentoUpdate();
    if(this.matricula && this.senha){

      const dadosColaboradores = {
        matricula: this.matricula,
        senha: this.senha,
      }

      await this.loginService.login(dadosColaboradores);

      this.AcessoRecebido();
    }
  }

  btnErro(){
    this.erro = !this.erro;
  }


  AcessoRecebido():void{
    if(!this.cookieSession.IsLoggedUser()){
      this.cookieSession.redirectLoginSICWEBANG();
    } else {
      console.log("else");
      this.router.navigate(['redirect'])
    }
  
  }


}

