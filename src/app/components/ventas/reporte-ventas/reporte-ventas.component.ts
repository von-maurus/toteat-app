import { Component, OnInit } from '@angular/core';
import { ExcelService } from 'src/app/services/excel/excel.service';
import { VentasService } from 'src/app/services/ventas/ventas.service';
import { AlertService } from 'src/app/utils/alerts/alert.service';
import { LoadingService } from 'src/app/utils/loading/loading.service';
import * as echarts from 'echarts';
import { FormatterService } from 'src/app/utils/formatter/formatter.service';

@Component({
  selector: 'app-reporte-ventas',
  templateUrl: './reporte-ventas.component.html',
  styleUrls: ['./reporte-ventas.component.scss']
})
export class ReporteVentasComponent implements OnInit {
  //Inicializar fechas
  inicio: string = "2000-01-01";
  fin: string = "2000-01-31";
  inicioShow: string = '';
  finShow: string = '';
  filter = '';

  // Table Variables para Ventas
  ventas: any[] = [];
  actions = [];
  ventasCols = [];

  // ------Ingresos Line Chart------
  lineChartIngresos: any;
  leyendasLineChart: any[] = [];
  dataLineChart: any[] = [];
  optionIngresosLine = {
    grid: { bottom: 100, left: 100 },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      // Fechas
      axisLabel: { rotate: 25 },
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line',
        name: 'Ingresos',
        showBackground: true,
      }
    ]
  };

  // ------------Dias Más Rentables Bar Chart---------------------
  barChartDiasRentables: any;
  leyendasBarChart: any[] = [];
  dataBarChart: any[] = [];
  optionDiasMasRentables = {
    legendHoverLink: true,
    grid: { bottom: 100, left: 100 },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
      name: 'Ingresos',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)'
      }
    }]
  };




  constructor(
    private excel: ExcelService,
    private service: VentasService,
    private alerts: AlertService,
    private loading: LoadingService,
    private formatter: FormatterService,
  ) { }

  ngOnInit(): void {
    this.loading.show();
    this.filter = 'annio';
    this.inicio = new Date(2019, 0, 1, -3, 0).toISOString().substr(0, 16);
    this.fin = new Date(2019, 12, 0, 20, 59).toISOString().substr(0, 16);
    this.inicioShow = this.formatter.timestampFormat(this.inicio);
    this.finShow = this.formatter.timestampFormat(this.fin);
    this.reload();
    this.lineChartIngresos = echarts.init(<HTMLDivElement>document.getElementById('ingresos-line-chart'));
    this.barChartDiasRentables = echarts.init(<HTMLDivElement>document.getElementById('dias-rentables-bar-chart'));
    this.lineChartIngresos.setOption(this.optionIngresosLine)
    this.barChartDiasRentables.setOption(this.optionDiasMasRentables)
    this.loading.hide();
  }

  onChangeInicio(event: any): void {
    this.inicio = event;
    this.inicioShow = this.formatter.timestampFormat(event);
    if (this.fin.length != 0 && this.fin != '' && this.fin != null) {
      if (this.fin <= this.inicio) {
        this.alerts.addAlert('Rango de fechas no válido.', 'danger');
      } else {
        this.reload();
      }
    }
  }

  onChangeTermino(event: any): void {
    this.fin = event;
    this.finShow = this.formatter.timestampFormat(event);
    if (this.inicio.length != 0 && this.inicio != '' && this.inicio != null) {
      if (this.fin <= this.inicio) {
        console.log('Rango no valido');
        this.alerts.addAlert('Rango de fechas no válido.', 'danger');
      } else {
        this.reload();
      }
    }
  }

  onYearSelected(): void {
    this.inicio = new Date(2019, 0, 1, -3, 0).toISOString().substr(0, 16);
    this.fin = new Date(2019, 11, 31, 20, 59).toISOString().substr(0, 16);
    this.inicioShow = this.formatter.timestampFormat(this.inicio);
    this.finShow = this.formatter.timestampFormat(this.fin);
    console.log('Inicio y fin ' + this.inicio + ' ' + this.fin);
    this.reload();
  }

  reloadIngresosLineChart() {
    // Grafico Ingresos por fecha
    if (this.filter = 'dia') {

    } else if (this.filter = 'mes') {

    } else {
      this.filter = 'año'
    }
  }

  reload() {
    this.loading.show();
    this.loading.hide();
  }

  dia() {
    this.filter = 'dia';
    this.reloadIngresosLineChart();
  }

  mes() {
    this.filter = 'mes';
    this.reloadIngresosLineChart();
  }

  anio() {
    this.filter = 'annio';
    this.reloadIngresosLineChart();
  }
}
