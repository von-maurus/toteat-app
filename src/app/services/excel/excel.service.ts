import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

interface Column {
  attribute?: string,
  label: string,
  value?: Function
}

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  exportarExcel(list: Object[], columns: Array<Column | string>, title: string = "export", sheetName: string = "Sheet1") {

    // const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
    let aux: any[] = [];

    list.forEach((el: any) => {
      let item: any = {};
      columns.forEach((col: any) => {
        if (typeof (col) == "string") {
          item[col] = el[col];
        } else {
          let label: any = col.attribute;
          if (col.label) label = col.label;
          if (col.value) item[label] = col.value(el, 0);
          else col[label] = item[label] = el[col.attribute];
        }

      })
      aux.push(item);
    });

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(aux);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, title + '.xlsx');
  }
}
