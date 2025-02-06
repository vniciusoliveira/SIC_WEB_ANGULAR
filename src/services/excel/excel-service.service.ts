import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelServiceService {

  constructor() { }


  exportarExcel(relatorio: Array<any>){
    try {
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(relatorio);
      const colWidths = [
        { wch: 15},
        { wch: 30},
        { wch: 30},
        { wch: 15},
        { wch: 15},
        { wch: 15},
        { wch: 20},
        { wch: 25},
      ];
      worksheet['!cols'] = colWidths;
      

      const workbook: XLSX.WorkBook = { Sheets: {'relatorio': worksheet}, SheetNames: ['relatorio']};
      const excelBuffer: any = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
      const now = new Date();
      this.saveAsExcelFile(excelBuffer, now.toLocaleString('pt-BR'))
    } catch (error) {
      alert("Erro ao gerar arquivo");
      console.log(`Erro em gerar excel:  ${error}`)
    }
  }

  private saveAsExcelFile(buffer: any, fileNAme: string): void {
    const dados: Blob = new Blob([buffer], {type: 'application/octet-stream'});
    const a: HTMLAnchorElement = document.createElement('a');
    document.body.appendChild(a);
    const url: string = window.URL.createObjectURL(dados);
    a.href = url;
    a.download = fileNAme + '.xlsx';
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }
}
