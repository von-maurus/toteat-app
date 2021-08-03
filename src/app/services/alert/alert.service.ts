import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  alertList: Array<{ mensaje: string, tipo: 'warning' | 'danger' | 'success' | 'primary' | 'secondary' | 'info' | 'light' | 'dark' }> = []

  constructor() { }

  removeAlert(index: number) {
    this.alertList.splice(index, 1)
  }

  addAlert(mensaje: string, tipo: 'warning' | 'danger' | 'success' | 'primary' | 'secondary' | 'info' | 'light' | 'dark') {
    let alerta = { mensaje: mensaje, tipo: tipo }
    this.alertList.push(alerta)
    setTimeout(() => {
      let index = this.alertList.indexOf(alerta)
      if (index != -1) {
        this.alertList.splice(index);
      }
    }, 5000)
  }
}
