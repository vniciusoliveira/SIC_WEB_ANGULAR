import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileExplorerService {
  private baseUrl = 'https://sua-api.com'; // Substitua pela URL base da API

  constructor(private http: HttpClient) {}

  /**
   * Método para listar arquivos e pastas de um diretório.
   * @param directoryPath Caminho do diretório opcional.
   * @returns Observable com a lista de arquivos e pastas.
   */
  listFilesAndFolders(directoryPath: string = ''): Observable<any> {
    const params = new HttpParams().set('directoryPath', directoryPath); // Adiciona o parâmetro se existir
    return this.http.get<any>(`${this.baseUrl}/list`, { params });
  }
}