import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CodifyInfoService {

  constructor() { }

  // Encode e Decode simples, pode ser usado para strings normais como texto, titulo, chave de objeto e etc.
  encodeContent(param:string):string{
    return btoa(encodeURIComponent(param));
  }
  decodeContent(param:any):string{
    return decodeURIComponent(atob(param));
  }

  // Encode e Decode JSON, necessário para fazer a conversão de objetos JSON como responses e listas para serem codificados.
  encodeContentJSON(param:any){
    return this.encodeContent(JSON.stringify(param));
  }
  decodeContentJSON(param:any){
    return JSON.parse(this.decodeContent(param));
  }
}
