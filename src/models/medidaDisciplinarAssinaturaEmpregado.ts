export class MedidaDisciplinarAssinaturaEmpregado{

  mdd_Codigo?:string = "";
  mddEmpregadoNrreg?: string = "";
  mddNomeEmpregado?: string = "";
  mddEmpregadoCPF?: string = "";
  mddEmpregadoDtNasc?: Date | undefined;
  mddEmpregadoAssinaturaDtHora?: Date | undefined;
  mddMdrCodigo?: Number = 0;
  assinado?: boolean = false;


  constructor(init?: Partial<MedidaDisciplinarAssinaturaEmpregado>) {
    // Se 'init' for passado, ele copia todas as propriedades
    Object.assign(this, init);
  }
}
