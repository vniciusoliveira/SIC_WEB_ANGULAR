
export class ChatResponse{
    matricula:string = '';
    remetente:string = '';
    destinatario:string = '';
    mensagem:string = '';
    dataEnvio?: Date ;
    horaEnvio: string = '';
    dataLido?: Date;
    horaLido: string = '';
    remetenteFLG: number = 0;

    constructor(init?: Partial<ChatResponse>) {
    // Se 'init' for passado, ele copia todas as propriedades
        Object.assign(this, init);
    }
}