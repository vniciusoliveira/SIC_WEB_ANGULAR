export interface InovAIItem {
  name: string;
  path: string;
  type: 'File' | 'Folder';
  creationTime: string;
  lastWriteTime: string;
  content?: string; // Conteúdo do arquivo, se for do tipo 'File'
}