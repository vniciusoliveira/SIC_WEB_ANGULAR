import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RelatorioHomeOfficeAvaliativoServiceService } from '../../services/relatorio-home-office-avaliativo-service.service'
import { ExcelServiceService } from '../../services/excel/excel-service.service'
import { CookieService } from 'ngx-cookie-service';
import { CookieSession } from '../../services/cookie/cookie-service-session.service';


@Component({
  selector: 'app-relatorio-premiacao-home-office-avaliativo',
  templateUrl: './relatorio-premiacao-home-office-avaliativo.component.html',
  styleUrls: ['./relatorio-premiacao-home-office-avaliativo.component.css']
})
export class RelatorioPremiacaoHomeOfficeAvaliativoComponent implements OnInit{
  mensagemErro:string="";
  nrreg: string="";
  carregamento: boolean=false;
  listaMovCodigo: any;
  resultadoRelatorio: any;

  constructor(private route:ActivatedRoute,
            private relatorioHomeOfficeService:RelatorioHomeOfficeAvaliativoServiceService,
            private ExcelService: ExcelServiceService,
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
    this.buscaMovCodigo();
  }

  async buscaMovCodigo(){
      this.listaMovCodigo = await this.relatorioHomeOfficeService.ConsultaConsultaMovCodigo()
  }

  async onSubmit(){
    this.carregamento = !this.carregamento;
    const nrreg = (document.getElementsByName('nrreg')[0] as HTMLInputElement).value;
    const movCod = (document.getElementsByName('selectMov')[0] as HTMLSelectElement).value;
    this.resultadoRelatorio = await this.relatorioHomeOfficeService.ConsultaRelatorioPremiacaoHomeOfficeAvaliativo(nrreg,movCod);
    console.log(this.resultadoRelatorio)
    this.SubirResposta(this.resultadoRelatorio);
    this.carregamento = !this.carregamento;
  }

  SubirResposta(result: Record<string,Array<string>>){
    const respContainer = document.getElementById('resp-id') as HTMLDivElement;
    if(respContainer){
      let table = document.createElement('table');
      table.classList.add('tableConfig');
      let headerCreated = false;
      for(let line in result){

        let content = result[line]
        // Cabeçalho da tabela
        if(!headerCreated){
          const headerRow = table.insertRow();
          for (const key in content) {
            const headerCell = document.createElement('th');
            headerCell.textContent = key.replaceAll("_", " ").toUpperCase();
            headerRow.appendChild(headerCell);
          }
          headerCreated = true;
        }

        const dataRow = table.insertRow();
        for(const data in content){
          // Object.keys(result);
          const dataCell = dataRow.insertCell();
          dataCell.textContent = String(content[data]);
        }
        respContainer.appendChild(table);
      }
    }
  }

  SalvarExcel(){
    this.ExcelService.exportarExcel(this.resultadoRelatorio);
  }
 
}


