import { MedidaDisciplinar } from './medidaDisciplinar.model';
export class MedidaDisciplinaredidaDisciplinarAssinaturaGerente{

  mdd_Codigo:string = "";
  MddGerenteContasNrreg: string = "";
  MddNomeGerenteContas: string = "";
  mddGerenteContasCpf: string = "";
  mddGerenteContasDtNasc: Date | undefined;
  mddGerenteAssinaturaDtHora: Date | undefined;
  mddNomeGerenteContas: string = "";
  mddMdrCodigo: Number = 0;
  assinado: boolean = false;


  constructor(init?: Partial<MedidaDisciplinaredidaDisciplinarAssinaturaGerente>) {
    // Se 'init' for passado, ele copia todas as propriedades
    Object.assign(this, init);
  }
}
