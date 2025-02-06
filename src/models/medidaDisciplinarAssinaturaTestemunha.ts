export class MedidaDisciplinarAssinaturaTestemunha{

  mdd_Codigo:string = "";
  mddTestemunhaNrreg: string = "";
  mddNomeTestemunha: string = "";
  mddTestemunhaCPF: string = "";
  mddTestemunhaDtNasc: Date | undefined;
  mddTestemunhaAssinaturaDtHora: Date | undefined;
  mddMdrCodigo: Number = 0;
  assinado: boolean = false;

  constructor(init?: Partial<MedidaDisciplinarAssinaturaTestemunha>) {
    // Se 'init' for passado, ele copia todas as propriedades
    Object.assign(this, init);
  }
}
