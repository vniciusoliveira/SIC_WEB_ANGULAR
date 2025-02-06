import { Injectable } from '@angular/core';
import { PathService } from '../path/path.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InovAIService {

  constructor(private path:PathService
              ,private http:HttpClient
  ) { }

  public ListarArquivosINOVAI(param:string = ''):Observable<any>{
    let queryString = '';
    if(param !== ''){
       queryString = `?directoryPath=${param}`
    }
    return this.http.get(this.path.getsicApiPath(`InovAI/list${queryString}`))
  }

  public EditarArquivo(filePath:string, newContent:string,nrreg:string){
    const body =  JSON.stringify(newContent);
    const fileEncode = encodeURIComponent(filePath)
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };

    return this.http.post(this.path.getsicApiPath(`InovAI/edit-file?filePath=${fileEncode}&nrreg=${nrreg}`),body, options);
  }
  
  public CriarArquivo(filePath: string, fileName: string, content: string, nrreg:string): Observable<any> {
    const body:string =  JSON.stringify(content); // Enviar o conteúdo como um objeto JSON com a chave 'content'
    const dirEncode = filePath == "" ? "/" : encodeURIComponent(filePath);
    const fileEncode = encodeURIComponent(fileName);

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    
    return this.http.post(this.path.getsicApiPath(`InovAI/create-file?fileName=${fileEncode}&directoryPath=${dirEncode}&nrreg=${nrreg}`), body, options); // Corpo agora é o objeto JSON
}

public CriarPasta(folderPath: string, folderName: string): Observable<any> {
  const dirEncode = folderPath === "" ? "/" : encodeURIComponent(folderPath);
  const folderEncode = encodeURIComponent(folderName);

  const options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  return this.http.get(
    this.path.getsicApiPath(`InovAI/create-folder?folderName=${folderEncode}&directoryPath=${dirEncode}`)
  );
}

  

  public Deletar(filePath: string, nrreg:string): Observable<any> {
    const fileEncode = encodeURIComponent(filePath);
    return this.http.delete(
      this.path.getsicApiPath(`InovAI/delete?path=${fileEncode}&nrreg=${nrreg}`)
    );
  }
}


