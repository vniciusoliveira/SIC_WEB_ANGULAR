import { MedidaDisciplinarAssinaturaTestemunha } from '../../models/medidaDisciplinarAssinaturaTestemunha';
import { MedidaDisciplinaredidaDisciplinarAssinaturaGerente } from '../../models/medidaDisciplinarAssinaturaGerente';
import { BuscaMedidasDisciplinaresService } from './../../services/MedidaDisciplinar/busca-medidas-disciplinares.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { PathService } from 'src/services/path/path.service';
import Swal from 'sweetalert2';
import { CookieSession } from '../../services/cookie/cookie-service-session.service';
import { MedidaDisciplinar } from '../../models/medidaDisciplinar.model';
import { MedidaDisciplinarAssinaturaEmpregado } from '../../models/medidaDisciplinarAssinaturaEmpregado';
import { CachesService } from '../../services/Caches/caches.service'
import { GeolocalizacaoService } from 'src/services/Geolocalizacao/geolocalizacao.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import * as JSZip from 'jszip';



@Component({
  selector: 'app-medida-disciplinar',
  templateUrl: './medida-disciplinar.component.html',
  styleUrls: ['./medida-disciplinar.component.css']
})
export class MedidaDisciplinarComponent {
  //@ViewChild('modalContent') modalContent: any;
  @ViewChild('modalContent',{static:false}) modalContent!: ElementRef<HTMLImageElement>
  nrreg:string='';
  nome:string='';
  // asset: string = this.path.asset;
  isModalOpen: boolean = false;
  isExpanded: boolean = false;
  showConfirmButton: boolean = false;

  // Dados da geolocalizacao
  latitude: number | null = null;
  longitude: number | null = null;
  errorMessage: string | null = null;

  // Confirmações de CPF e Data de Nascimento do Gerente
  cpfGerente: string = '';
  dataNascimentoGerente: string = '';
  nrregGerente: string = '';
  nomeGerente: string = '';
  gerenteValidado: boolean = false;
  dataAssinaturaGerente: Date = new Date();

  // Confirmações de CPF e Data de Nascimento do Empregado
  cpfEmpregado: string = '';
  dataNascimentoEmpregado: string = '';
  nrregEmpregado: string = '';
  nomeEmpregado: string = '';
  empregadoValidado: boolean = false;
  dataAssinaturaEmpregado: Date = new Date();

  // Confirmações de CPF e Data de Nascimento da Testemunha
  cpfTestemunha: string = '';
  dataNascimentoTestemunha: string = '';
  nrregTestemunha: string = '';
  nomeTestemunha: string = '';
  testemunhaValidado: boolean = false;
  dataAssinaturaTestemunha: Date = new Date();


  // Variáveis para armazenar os dados da assinatura
  showFieldsManager: boolean = true;
  showFieldsEmployee: boolean = true;
  showDateManager = false;
  showDateEmployee = false;
  getDateNow: string = "";

  listDisciplinaryMeasure: MedidaDisciplinar[] = [];
  dadosMedidaDisciplinar: MedidaDisciplinar | undefined;
  assinaturaGerenteMedida: MedidaDisciplinaredidaDisciplinarAssinaturaGerente | undefined;
  assinaturaEmpregadoObj: MedidaDisciplinarAssinaturaEmpregado | undefined;
  assinaturaTestemunhaObj: MedidaDisciplinarAssinaturaTestemunha | undefined


  constructor(private path: PathService,
              private cookieSession:CookieSession,
              private buscaMedida: BuscaMedidasDisciplinaresService,
              private Cache: CachesService,
              private geolocationService: GeolocalizacaoService,
  ) {}


  ngOnInit(){
    if(!this.cookieSession.IsLoggedUser()){ this.cookieSession.redirectLoginSICWEBANG;};
    if(this.cookieSession.checkCookieCodify('user')){
      let obj:any = this.cookieSession.getCookieDecodifyParameterCodify(('user'));
      this.nrreg = obj['ope_nrreg'];
      this.nome = obj['ope_nome'];
    } else if (this.cookieSession.checkCookieBtoa('matricula')){
      this.nrreg = this.cookieSession.getCookie(btoa('matricula')).toString();
    }
    this.BuscaMedidaDisciplinar();
    this.getDateNow = this.getCurrentDate();
    this.getLocation();
  }

  async BuscaMedidaDisciplinar() {
  const cacheKey = `medidas_${this.nrreg}`;
  const cachedData = this.Cache.get(cacheKey);

  if (cachedData) {
    this.listDisciplinaryMeasure = cachedData; // Use dados do cache
  } else {
    this.listDisciplinaryMeasure = await this.buscaMedida.getMedidaDisciplinar(this.nrreg);
    this.Cache.set(cacheKey, this.listDisciplinaryMeasure); // Armazene no cache
  }
}

  // Abrir a modal principal
async openModal(measure: MedidaDisciplinar) {
  this.isModalOpen = true;
  this.isExpanded = false;

  const cacheKey = `dados_${measure.tsD_Codigo}_${measure.mdR_Codigo}`;
  const cachedData = this.Cache.get(cacheKey);

  if (cachedData) {
    this.dadosMedidaDisciplinar = cachedData; // Use dados do cache
    this.gerenteValidado = cachedData.assinaturaGerente.assinado;
    this.empregadoValidado = cachedData.assinaturaEmpregado.assinado;
    this.testemunhaValidado = cachedData.assinaturaTestemunha.assinado;
    this.assinaturaGerenteMedida = cachedData.assinaturaGerente;
    this.assinaturaEmpregadoObj = cachedData.assinaturaEmpregado;
    this.assinaturaTestemunhaObj = cachedData.assinaturaTestemunha;
  } else {
    // Lógica existente para buscar dados
    try {
      const dados: MedidaDisciplinar = await this.buscaMedida.PostDadosMedidaDisciplinar(measure.tsD_Codigo, measure.mdR_Codigo);
      this.dadosMedidaDisciplinar = dados;

      const assinaturaGerente = await this.buscaMedida.getAssinaturaGerente(measure.mdR_Codigo) as MedidaDisciplinaredidaDisciplinarAssinaturaGerente;
      const assinaturaEmpregado = await this.buscaMedida.getAssinaturaEmpregado(measure.mdR_Codigo) as MedidaDisciplinarAssinaturaEmpregado;
      const assinaturaTestemunha = await this.buscaMedida.getAssinaturaTestemunha(measure.mdR_Codigo) as MedidaDisciplinarAssinaturaTestemunha;

      // Armazene os dados no cache
      this.Cache.set(cacheKey, {
        assinaturaGerente,
        assinaturaEmpregado,
        assinaturaTestemunha,
        dadosMedidaDisciplinar: dados
      });

      // Lógica existente para validar assinaturas
      this.gerenteValidado = assinaturaGerente.assinado;
      this.empregadoValidado = assinaturaEmpregado.assinado ?? false; // Garantir que seja booleano
      this.testemunhaValidado = assinaturaTestemunha.assinado;
      this.assinaturaGerenteMedida = assinaturaGerente;
      this.assinaturaEmpregadoObj = assinaturaEmpregado;
      this.assinaturaTestemunhaObj = assinaturaTestemunha;
    } catch (error) {
      console.error("Erro ao buscar os dados", error);
    }
  }
}

  trackByMeasureId(index: number, measure: any): number {
    return measure.mdR_Codigo;
  }

   getCurrentDate(): string {
    const today = new Date();

    // Obter o dia, mês e ano
    const day: string = String(today.getDate()).padStart(2, '0');
    const month: string = String(today.getMonth() + 1).padStart(2, '0'); // O mês é baseado em zero, então adicionamos 1
    const year: string = String(today.getFullYear());

    // Retornar a data no formato DD/MM/YYYY
    return `${day}/${month}/${year}`;
  }

  checkIfShowConfirmButton() {
    if (this.showFieldsManager || this.showFieldsEmployee) {
      this.showConfirmButton = true;
    }
  }

  // Fechar a modal principal
  closeModal() {
    this.isModalOpen = false;
    // Limpa os campos ao fechar
    this.cpfGerente = '';
    this.dataNascimentoGerente = '';
    this.cpfEmpregado = '';
    this.dataNascimentoEmpregado = '';
    this.showDateManager = true;
    this.showDateEmployee = true;
  }

  // Quando clicar em "Confirmar", abrir a segunda parte para inserir CPF e data
  async confirmarAssinatura() {
    if (!this.isExpanded) {
        this.isExpanded = true; // Expande a modal para a segunda parte (CPF e data)
    } else {
        // Valida os dados do gerente
        if (this.empregadoValidado && this.gerenteValidado) {
            // Lógica para validar os dados e gerar o PDF aqui
            await this.gerarPDF(); // Chama a função para gerar o PDF
            Swal.fire({
                icon: 'success',
                title: 'Assinatura Confirmada!',
                text: 'A assinatura foi realizada com sucesso.',
                confirmButtonText: 'OK',
                confirmButtonColor: '#25854d'
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Erro!',
                text: 'Assinatura(s) pendentes. Por favor, realize a confirmação.',
                confirmButtonText: 'OK',
                confirmButtonColor: '#25854d'
            });
        }
    }
  }

  async gerarPDF(): Promise<void> {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const zip = new JSZip();
    const marginLeft = 10;
    let currentY = 10; // Controla a posição vertical

    // Função para adicionar seções com fundo cinza
    const adicionarSecaoComFundo = (titulo: string): void => {
        const pageWidth = pdf.internal.pageSize.getWidth();
        const titleWidth = pdf.getTextWidth(titulo);
        const x = (pageWidth - titleWidth) / 2;

        pdf.setFillColor(220, 220, 220);
        pdf.rect(marginLeft * 2, currentY - 8, pageWidth - marginLeft * 4, 16, 'F');
        pdf.setFontSize(16);
        pdf.setTextColor(0, 0, 0);
        pdf.text(titulo, x, currentY);
        currentY += 10;
    };

// Função para centralizar texto e lidar com quebras de linha
const centralizarTexto = (texto: string, maxWidth: number): void => {
  pdf.setFontSize(10); // Define o tamanho da fonte
  const pageWidth = pdf.internal.pageSize.getWidth(); // Largura da página
  const wrappedText: string[] = pdf.splitTextToSize(texto, maxWidth); // Divide o texto para caber no limite de largura
  wrappedText.forEach((line: string) => { // Especificando explicitamente o tipo da variável line
      const textWidth = pdf.getTextWidth(line); // Calcula a largura da linha
      const x = (pageWidth - textWidth) / 2; // Calcula a posição X para centralizar
      pdf.text(line, x, currentY); // Desenha a linha centralizada
      currentY += 6; // Ajusta a posição vertical para a próxima linha
  });
};

    // Cabeçalho: "Dados do Empregado"
    adicionarSecaoComFundo('Dados do Empregado');

    // Linha divisória
    pdf.setDrawColor(200, 200, 200);
    pdf.line(marginLeft, currentY + 3, 200, currentY + 3);
    currentY += 10;

    // Informações do empregado
    pdf.setFontSize(12);
    const empregadoInfo = [
        { label: 'Nº de Registro:', value: this.dadosMedidaDisciplinar?.mdR_Codigo ?? 'N/A' },
        { label: 'Nome:', value: this.dadosMedidaDisciplinar?.opE_Nome ?? 'N/A' },
        { label: 'Matrícula:', value: this.dadosMedidaDisciplinar?.opE_NRREG ?? 'N/A' },
        { label: 'Operação/Depto:', value: this.dadosMedidaDisciplinar?.ctR_Descricao ?? 'N/A' },
        { label: 'Sanção:', value: `${this.dadosMedidaDisciplinar?.advertencia ?? ''} ${this.dadosMedidaDisciplinar?.suspensao ?? ''}` },
        { label: 'Data de Retorno:', value: this.dadosMedidaDisciplinar?.dataretorno ?? 'N/A' }
    ];

    empregadoInfo.forEach(info => {
        pdf.setTextColor(100, 100, 100);
        pdf.text(info.label, marginLeft, currentY);
        pdf.setTextColor(50, 50, 50);
        pdf.text(String(info.value), marginLeft + 40, currentY);
        currentY += 5;
    });

    currentY += 10;

    // Cabeçalho: "Descrição da Ocorrência"
    adicionarSecaoComFundo('Descrição da Ocorrência');

    // Centraliza o texto do motivo e descrição
    centralizarTexto(this.dadosMedidaDisciplinar?.motivo_Medida ?? 'N/A', 180);
    centralizarTexto(this.dadosMedidaDisciplinar?.mdR_DescricaoMedida ?? 'N/A', 180);

    currentY += 10;

    // Informações do gerente
    pdf.setFontSize(14);
    pdf.setTextColor(0, 0, 0);
    pdf.text(`Nome do Gerente de Contas: ${this.dadosMedidaDisciplinar?.nomE_GESTOR ?? 'N/A'}`, marginLeft, currentY);
    currentY += 10;

    // Imagem de confirmação
    // const checkImageBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAABCAIAAAD0Z0Z0AAAAAElFTkSuQmCC';

    // Assinaturas
    const assinaturas = [
        { label: 'Assinatura do Gerente', name: this.assinaturaGerenteMedida?.mddNomeGerenteContas, date: this.assinaturaGerenteMedida?.mddGerenteAssinaturaDtHora, cpf: this.assinaturaGerenteMedida?.mddGerenteContasCpf },
        { label: 'Assinatura do Empregado', name: this.assinaturaEmpregadoObj?.mddNomeEmpregado, date: this.assinaturaEmpregadoObj?.mddEmpregadoAssinaturaDtHora, cpf: this.assinaturaEmpregadoObj?.mddEmpregadoCPF },
        { label: 'Assinatura da Testemunha', name: this.assinaturaTestemunhaObj?.mddNomeTestemunha, date: this.assinaturaTestemunhaObj?.mddTestemunhaAssinaturaDtHora, cpf: this.assinaturaTestemunhaObj?.mddTestemunhaCPF }
    ];

    assinaturas.forEach((assinatura, index) => {
        pdf.setFontSize(12);
        pdf.setTextColor(50, 50, 50);
        pdf.text(`${assinatura.label}: ${assinatura.name ?? 'Não assinado'}`, marginLeft, currentY);

        // if (assinatura.name) {
        //     pdf.addImage(checkImageBase64, 'PNG', marginLeft + 100, currentY - 10, 10, 10);
        // }

        currentY += 6;
        pdf.text(`CPF: ${this.formatarCPF(assinatura.cpf ?? 'N/A')}`, marginLeft, currentY);
        currentY += 6;

        if (assinatura.date) {
            pdf.text(`Assinou em: ${new Date(assinatura.date).toLocaleString()}`, marginLeft, currentY);
            currentY += 6;
        }

        if (index < assinaturas.length - 1) {
            pdf.setDrawColor(200, 200, 200);
            pdf.line(marginLeft, currentY, 200, currentY);
            currentY += 5;
        }
    });

    // Nota final
    currentY += 10;
    pdf.setFontSize(10);
    pdf.setTextColor(100, 100, 100);
    pdf.text(
        'Estou ciente que a reincidência em procedimentos similares/idênticos poderá configurar a rescisão do contrato de trabalho por justa causa.',
        marginLeft,
        currentY,
        { maxWidth: 190 }
    );

   const pdfBlob = pdf.output('blob');
   zip.file('medida_disciplinar.pdf', pdfBlob);

 const adicionarConteudoAssinatura = (pdfInstance: jsPDF, tipo: string, nome: string | undefined, assinatura: string) => {

        if(assinatura == 'g'){
        pdfInstance.setFontSize(9);
        pdfInstance.text(`${tipo}: ${nome ?? 'Não assinado'}`, marginLeft, currentY);
        currentY += 12; // Espaço entre assinaturas
        pdfInstance.text(`CPF: ${this.formatarCPF(this.assinaturaGerenteMedida?.mddGerenteContasCpf ?? 'N/A')}`, marginLeft, currentY);
        currentY += 12; // Espaço entre assinaturas
        pdfInstance.text(`Assinou em: ${new Date(this.assinaturaGerenteMedida?.mddGerenteAssinaturaDtHora ?? '').toLocaleString()}`, marginLeft, currentY);
        currentY += 12; // Espaço entre assinaturas
        }

        if(assinatura == 'e'){
        pdfInstance.setFontSize(9);
        pdfInstance.text(`${tipo}: ${nome ?? 'Não assinado'}`, marginLeft, currentY);
        currentY += 12; // Espaço entre assinaturas
        pdfInstance.text(`CPF: ${this.formatarCPF(this.assinaturaEmpregadoObj?.mddEmpregadoCPF ?? 'N/A')}`, marginLeft, currentY);
        currentY += 12; // Espaço entre assinaturas
        pdfInstance.text(`Assinou em: ${new Date(this.assinaturaEmpregadoObj?.mddEmpregadoAssinaturaDtHora ?? '').toLocaleString()}`, marginLeft, currentY);
        currentY += 12; // Espaço entre assinaturas
        }

        if(assinatura == 't'){
        pdfInstance.setFontSize(9);
        pdfInstance.text(`${tipo}: ${nome ?? 'Não assinado'}`, marginLeft, currentY);
        currentY += 10; // Espaço entre assinaturas
        pdfInstance.text(`CPF: ${this.formatarCPF(this.assinaturaTestemunhaObj?.mddTestemunhaCPF ?? 'N/A')}`, marginLeft, currentY);
        currentY += 10; // Espaço entre assinaturas
        pdfInstance.text(`Assinou em: ${new Date(this.assinaturaTestemunhaObj?.mddTestemunhaAssinaturaDtHora ?? '').toLocaleString()}`, marginLeft, currentY);
        currentY += 10; // Espaço entre assinaturas
        pdfInstance.text('MARCOS ANTONIO assinou como testemunha. Via Sistema TMKT.', marginLeft, currentY);
        currentY += 7; // Espaço entre assinaturas
        pdfInstance.text('IP: 10.206.104.117.', marginLeft,currentY)
        currentY += 7; // Espaço entre assinaturas
        pdfInstance.text('Localização compartilhada pelo dispositivo eletrônico: -23.527,-46.3221.', marginLeft, currentY);
        currentY += 7; // Espaço entre assinaturas
        pdfInstance.text('Nome da máquina: zl-desenv4085.tmkt.servicos.mkt',marginLeft,currentY);
        }
    };

    // Definindo a largura e altura para os PDFs de assinatura
    const largura = 260;
    const altura = 70;

    // Gerar PDF para a assinatura do Gerente
    const pdfGerente = new jsPDF('l', 'px', [largura, altura]);
    currentY = 10; // Reiniciar a posição Y para o novo PDF
    adicionarConteudoAssinatura(pdfGerente, 'Assinatura do Gerente', this.assinaturaGerenteMedida?.mddNomeGerenteContas, 'g');
    const gerentePdf = pdfGerente.output('blob');
    zip.file('assinatura_gerente.pdf', gerentePdf);

    // Gerar PDF para a assinatura do Empregado
    const pdfEmpregado = new jsPDF('l', 'px', [largura, altura]);
    currentY = 10; // Reiniciar a posição Y para o novo PDF
    adicionarConteudoAssinatura(pdfEmpregado, 'Assinatura do Empregado', this.assinaturaEmpregadoObj?.mddNomeEmpregado, 'e');
    const empregadoPdf = pdfEmpregado.output('blob');
    zip.file('assinatura_empregado.pdf', empregadoPdf);

    // Gerar PDF para a assinatura da Testemunha
    const pdfTestemunha = new jsPDF('l', 'px', [largura, altura]);
    currentY = 10; // Reiniciar a posição Y para o novo PDF
    adicionarConteudoAssinatura(pdfTestemunha, 'Assinatura da Testemunha', this.assinaturaTestemunhaObj?.mddNomeTestemunha, 't');
    const testemunhaPdf = pdfTestemunha.output('blob');
    zip.file('assinatura_testemunha.pdf', testemunhaPdf);

    // Salvar o arquivo zip com todos os PDFs
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    const zipFileName = 'assinaturas.zip';
    const link = document.createElement('a');
    link.href = URL.createObjectURL(zipBlob);
    link.download = zipFileName;
    link.click();
}


  formatarCPF(cpf: string): string {
    if (!cpf) return 'N/A'; // Retorna 'N/A' se o CPF não estiver disponível
    // Remove caracteres não numéricos
    cpf = cpf.replace(/\D/g, '');
    // Formata o CPF
    return cpf.replace(/(\d{3})(\d)/, '$1.$2') // Adiciona o primeiro ponto
              .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona o segundo ponto
              .replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Adiciona o hífen
  }

  async validarGerente() {
    if (!this.cpfGerente || !this.dataNascimentoGerente) {
        Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: 'Por favor, preencha todos os campos do gerente.',
            confirmButtonText: 'OK',
            confirmButtonColor: '#25854d'
        });
        return;
    }

    try {
        const resultado = await this.buscaMedida.validarGerente(this.cpfGerente, this.dataNascimentoGerente);

        if (resultado.valido) {
            this.nomeGerente = resultado.nome;
            this.gerenteValidado = true;
            this.dataAssinaturaGerente = new Date();
            this.nrregGerente = resultado.nrreg;

            this.getLocation();

            const assinaturaData = {
                nrreg: this.nrregGerente,
                nomeGerente: this.dadosMedidaDisciplinar?.nomE_GESTOR,
                cpfGerente: this.cpfGerente,
                dataNascimentoGerente: this.dataNascimentoGerente,
                mdrCodigo: this.dadosMedidaDisciplinar?.mdR_Codigo,
               MddGerenteGeoLocalizacaoAssinatura: {
                   latitude: this.latitude,
                   longitude: this.longitude
               }
            };
            await this.buscaMedida.confirmarAssinaturaGerente(assinaturaData);
        } else {
            alert('Dados do gerente inválidos. Por favor, verifique e tente novamente.');
        }
    } catch (erro) {
        console.error('Erro ao validar gerente:', erro);
        alert('Ocorreu um erro ao validar os dados do gerente. Por favor, confirme os dados e tente novamente.');
    }
  }

  async validarEmpregado() {
    try {
      if (!this.cpfEmpregado || !this.dataNascimentoEmpregado) {
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          text: 'Por favor, preencha todos os campos do empregado.',
          confirmButtonText: 'OK',
          confirmButtonColor: '#25854d'
        });
        return;
      }

      const resultado = await this.buscaMedida.validarEmpregado(this.cpfEmpregado, this.dataNascimentoEmpregado);

        if (resultado.valido) {
        this.nomeEmpregado = resultado.nome;
        this.nrregEmpregado = resultado.nrreg;
        this.empregadoValidado = true;
        this.cpfEmpregado = resultado.NumCpf;
        this.dataAssinaturaEmpregado = new Date();

        this.getLocation();

        const assinaturaDataEmpregado = {
          empregadoNrreg: this.nrregEmpregado,
          empregadoNome: resultado.nome,
          empregadoCpf: resultado.numCpf,
          dataNascimentoDoEmpregado: this.dataNascimentoEmpregado,
          mdrCodigo: this.dadosMedidaDisciplinar?.mdR_Codigo,
          MddEmpregadoGeoLocalizacaoAssinatura: {
            latitude: this.latitude,
            longitude: this.longitude
         }
        };

        await this.buscaMedida.confirmarAssinaturaEmpregado(assinaturaDataEmpregado);

      }
      else {
        alert('Dados do empregado inválidos. Por favor, verifique e tente novamente.');
      }
    } catch (erro) {
      console.error('Erro ao validar empregado:', erro);
      alert('Ocorreu um erro ao validar os dados do empregado. Por favor, tente novamente mais tarde.');
    }
  }

  async validarTestemunha(){
    try{

      if(!this.cpfTestemunha || !this.dataNascimentoTestemunha){
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          text: 'Por favor, preencha todos os campos da testemunha.',
          confirmButtonText: 'OK',
          confirmButtonColor: '#25854d'
        });
        return;
      }

      const resultado = await this.buscaMedida.validarTestemunha(this.cpfTestemunha, this.dataNascimentoTestemunha);

      if(resultado.valido){
        this.nomeTestemunha = resultado.nome;
        this.nrregTestemunha = resultado.nrreg;
        this.testemunhaValidado = true;
        this.cpfTestemunha = resultado.NumCpf;
        this.dataAssinaturaTestemunha = new Date();
      }

      this.getLocation();

      const assinaturaDataTestemunha = {
        testemunhaNrreg: this.nrregTestemunha,
        testemunhaNome: resultado.nome,
        testemunhaCpf: resultado.numCpf,
        dataNascimentoDaTestemunha: this.dataNascimentoTestemunha,
        mdrCodigo: this.dadosMedidaDisciplinar?.mdR_Codigo,
        MddTestemunhaGeoLocalizacaoAssinatura: {
          latitude: this.latitude,
          longitude: this.longitude
       }
      };

      await this.buscaMedida.confirmarAssinaturaTestemunha(assinaturaDataTestemunha);

    }
    catch(erro){
      console.error('Erro ao validar a testemunha:', erro);
      alert('Ocorreu um erro ao validar os dados da testemunha. Por favor, tente novamente mais tarde.');
    }
  }

    getLocation(): void {
    this.geolocationService.getCurrentPosition().subscribe(
      (position) => {

        this.latitude = position.latitude,
        this.longitude = position.longitude
      },
      (error) => {
        this.errorMessage = `Erro ao obter localização: ${error.message}`;
        console.error(error);
      }
    );
  }

}
