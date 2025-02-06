export class MedidaDisciplinar{
  cgO_Descricao:string = "";
  cmD_Descricao:string = "";
  ctR_Descricao:string = "";
  icM_Descricao:string = "";
  mdR_Codigo:number = 0;
  mdR_Data:string = "";
  mdR_DescricaoMedida:string = "";
  opE_NRREG:string = "";
  opE_Nome:string = "";
  suP_NRREG:string = "";
  suP_Nome:string = "";
  tsD_Codigo:number = 0;
  tsD_Descricao:string = "";
  nomE_GESTOR: string = "";
  data_emissao: string = "";
  advertencia: string = "";
  suspensao: string = "";
  dataretorno: string = "";
  testemunha_1: string = "";
  testemunha_2: string = "";
  motivo_Medida: string = "";
  mdr_DataHora: string = "";

  constructor(init?: Partial<MedidaDisciplinar>) {
    // Se 'init' for passado, ele copia todas as propriedades
    Object.assign(this, init);
  }
}
