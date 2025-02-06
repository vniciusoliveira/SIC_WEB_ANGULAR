import { Component, OnInit } from '@angular/core';
import { CookieSession } from '../../services/cookie/cookie-service-session.service';
import { InovAIService } from 'src/services/inovAI/inov-ai.service';
import { InovAIItem } from 'src/interfaces/InovAI.interface';

@Component({
  selector: 'app-inov-ai',
  templateUrl: './inov-ai.component.html',
  styleUrls: ['./inov-ai.component.css']
})
export class InovAIComponent implements OnInit {
  // Variáveis relacionadas ao gerenciamento de arquivos e pastas
  folderName: string = '';  // Nome da nova pasta
  nrreg: string = "";  // Número de registro (usado para sessões de usuário)
  acessoUltimo: string = '';  // Último diretório acessado
  acessoPai: string = '';  // Diretório pai do último acessado
  selectedFile: InovAIItem | null = null;  // Arquivo selecionado para edição
  selectedFolder: InovAIItem | null = null;  // Pasta selecionada
  isCreatingFile: boolean = false;  // Flag para indicar se está criando um arquivo
  isCreatingFolder: boolean = false;  // Flag para indicar se está criando uma pasta
  newFileName: string = '';  // Nome do novo arquivo 
  newFolderName: string = '';  // Nome da nova pasta 
  newFileContent: string = '';  // Conteúdo do novo arquivo
  content: InovAIItem[] = [];  // Lista de arquivos e pastas

  constructor(private cookieSession: CookieSession, private inovAI: InovAIService) {}

  // Inicializa o componente, verifica a sessão e carrega arquivos
  ngOnInit(): void {
    if (!this.cookieSession.IsLogged()) {
      this.cookieSession.redirectLoginSICWEB(); // Redireciona se o usuário não estiver logado
    }

    // Obtém o número de registro do usuário (se disponível)
    if (this.cookieSession.checkCookieCodify('user')) {
      let obj: any = this.cookieSession.getCookieDecodifyParameterCodify('user');
      this.nrreg = obj['ope_nrreg'];
    } else if (this.cookieSession.checkCookieBtoa('matricula')) {
      this.nrreg = this.cookieSession.getCookie(btoa('matricula')).toString();
    }

    // Carrega os arquivos no diretório atual
    this.getArquivos();
  }

  // Obtém arquivos do diretório especificado ou o último diretório acessado
  getArquivos(parametro: string = ""): void {
    if (parametro === "" && this.acessoUltimo !== "") {
      parametro = this.acessoUltimo; // Se não for fornecido um caminho, usa o último acessado
    }

    if (parametro !== this.acessoUltimo) {
      this.acessoUltimo = parametro;
      this.acessoPai = parametro.substring(0, parametro.lastIndexOf("\\"));
    }

    // Chama o serviço para listar arquivos e pastas
    this.inovAI.ListarArquivosINOVAI(parametro).subscribe({
      next: (res) => {
        this.content = res; // Atualiza a lista de arquivos e pastas
      },
      error: (err) => {
        console.error(err); // Em caso de erro, exibe no console
      }
    });
  }

  // Função para abrir um arquivo para edição
  openFile(file: InovAIItem): void {
    this.selectedFile = { ...file }; // Cria uma cópia do arquivo selecionado
  }

  // Função para salvar um arquivo editado
  saveFile(path: string, newContent: string): void {
    this.inovAI.EditarArquivo(path, newContent, this.nrreg).subscribe({
      next: (res: any) => {
        alert(res['message']);
        this.closePopup(); // Fecha o popup após salvar
      },
      error: (err) => {
        console.error(err); // Exibe erro no console se ocorrer
      }
    });
  }

  // Função para criar um novo arquivo
  createNewFile(fileName: string, newContent: string): void {
    this.inovAI.CriarArquivo(this.acessoUltimo, fileName, newContent, this.nrreg).subscribe({
      next: (res: any) => {
        alert(res?.message ?? 'Arquivo criado com sucesso!');
        this.closePopup(); // Fecha o popup após criar o arquivo
      },
      error: (err) => {
        console.error('Erro ao criar o arquivo:', err);
        alert(`Erro ao criar o arquivo: ${err?.error?.message ?? 'Erro desconhecido'}`);
      }
    });
  }

  // Função para criar uma nova pasta
  createNewFolder(folderName: string): void {
    if (!folderName.trim()) {
      alert('O nome da pasta é obrigatório!');
      return;
    }

    this.inovAI.CriarPasta(this.acessoUltimo, folderName).subscribe({
      next: (res: any) => {
        alert(res?.message ?? 'Pasta criada com sucesso!');
        this.closePopup(); // Fecha o popup após criar a pasta
      },
      error: (err) => {
        console.error('Erro ao criar a pasta:', err);
        alert(`Erro ao criar a pasta: ${err?.error?.message ?? 'Erro desconhecido'}`);
      }
    });
  }

  // Função para excluir um arquivo ou pasta
  deleteItem(obj: InovAIItem): void {
    this.inovAI.Deletar(obj.path, this.nrreg).subscribe({
      next: (res) => {
        alert(res['message']);
        this.getArquivos(); // Atualiza a lista após a exclusão
      },
      error: (err) => {
        console.error('Erro ao excluir o arquivo:', err);
        alert('Erro ao excluir o arquivo');
      }
    });
  }

  // Função para iniciar o processo de criação de uma nova pasta
  createFolder(): void {
    this.isCreatingFolder = true;
  }

  // Função para iniciar o processo de criação de um novo arquivo
  createFile(): void {
    this.isCreatingFile = true;
  }

  // Função para abrir uma pasta e mostrar seus arquivos
  openFolder(folder: InovAIItem): void {
    this.getArquivos(folder.path); // Chama a função para listar arquivos da pasta selecionada
  }

  // Função para abrir um arquivo dentro de uma pasta
  openFileInFolder(file: InovAIItem): void {
    this.selectedFile = { ...file }; // Cria uma cópia do arquivo selecionado para edição
  }

  // Função para criar um arquivo dentro de uma pasta
  createFileInFolder(folder: InovAIItem): void {
    this.selectedFolder = folder; // Seleciona a pasta onde o arquivo será criado
    this.isCreatingFile = true; // Ativa o modo de criação de arquivo
  }

  // Função para fechar o popup e resetar o estado
  closePopup(): void {
    this.isCreatingFile = false; // Fecha o popup de criação de arquivo
    this.isCreatingFolder = false; // Fecha o popup de criação de pasta
    this.newFileName = '';
    this.newFileContent = '';
    this.selectedFile = null; // Fecha o arquivo selecionado
    this.selectedFolder = null; // Fecha a pasta selecionada
    this.getArquivos(); // Atualiza a lista de arquivos/pastas
  }
}
