import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert/alert.service';
import { ExcelService } from 'src/app/services/excel/excel.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { VentasService } from 'src/app/services/ventas/ventas.service';

@Component({
  selector: 'app-reporte-ventas',
  templateUrl: './reporte-ventas.component.html',
  styleUrls: ['./reporte-ventas.component.scss']
})
export class ReporteVentasComponent implements OnInit {

  //Inicializar fechas
  inicio: string = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().substr(0, 10);
  fin: string = new Date(new Date().getFullYear(), (new Date().getMonth() - 0) + 1, 0).toISOString().substr(0, 10);

  constructor(
    private excel: ExcelService,
    private service: VentasService,
    private alerts: AlertService,
    private loading: LoadingService,
  ) { }

  ngOnInit(): void {
  }

  onChangeInicio(): void {
    if (this.fin.length != 0 && this.fin != '' && this.fin != null) {
      if (this.fin <= this.inicio) {
        this.alerts.addAlert('Rango de fechas no válido.', 'danger');
      } else {
        this.reload();
      }
    }
  }

  onChangeTermino(): void {
    if (this.inicio.length != 0 && this.inicio != '' && this.inicio != null) {
      if (this.fin <= this.inicio) {
        this.alerts.addAlert('Rango de fechas no válido.', 'danger');
      } else {
        this.reload();
      }
    }
  }

  onHoySelected(): void {
    var date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).toISOString().substr(0, 10);
    this.inicio = date;
    this.fin = date;
    this.reload();
  }

  reload() {

  }
}
