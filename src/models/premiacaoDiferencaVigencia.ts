
export class premiacaoQueFazADiferenca{
    data:string = '';
    elegivel:number = 0;
    msG_ELEGIVEL:string = '';
    nrreg:string = '';
    ponto:number=0;
    valor:number=0;
    vpe_codigo:string='';
    vpe_data_fim:string='';
    vpe_data_inicio:string='';

    constructor(init?: Partial<premiacaoQueFazADiferenca>) {
    // Se 'init' for passado, ele copia todas as propriedades
        Object.assign(this, init);
    }
}