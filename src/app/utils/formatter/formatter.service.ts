import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatterService {

  constructor() { }

  timestampFormat(fecha: string) {
    if (fecha) {
      return fecha.substr(8, 2) + "-" + fecha.substr(5, 2) + "-" + fecha.substr(0, 4) + " " + fecha.substr(11, 8);
    } else {
      return fecha
    }
  }
  /**
   * Cambia el formato de una fecha de "yyyy-mm-dd" a "dd-mm-yyyy"
   */
  dateFormat(fecha: string) {
    if (fecha) {
      return fecha.substr(8, 2) + "-" + fecha.substr(5, 2) + "-" + fecha.substr(0, 4)
    } else {
      return fecha
    }
  }
  /**
   * Cambia el formato de una fecha de "dd-mm-yyyy" a "yyyy-mm-dd"
   */
  usaDateFormat(fecha: string) {
    if (fecha) {
      return fecha.substr(6, 4) + "-" + fecha.substr(3, 2) + "-" + fecha.substr(0, 2)
    } else {
      return fecha
    }
  }
}
