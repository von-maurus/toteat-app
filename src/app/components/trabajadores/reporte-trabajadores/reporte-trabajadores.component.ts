import { Component, OnInit } from '@angular/core';
import { ExcelService } from 'src/app/services/excel/excel.service';
import { VentasService } from 'src/app/services/ventas/ventas.service';
import { AlertService } from 'src/app/utils/alerts/alert.service';
import { FormatterService } from 'src/app/utils/formatter/formatter.service';
import { LoadingService } from 'src/app/utils/loading/loading.service';
import * as echarts from 'echarts';

@Component({
  selector: 'app-reporte-trabajadores',
  templateUrl: './reporte-trabajadores.component.html',
  styleUrls: ['./reporte-trabajadores.component.scss']
})
export class ReporteTrabajadoresComponent implements OnInit {

  //------------Inicializar fechas----------
  inicio: string = "2000-01-01";
  fin: string = "2000-01-31";
  inicioShow: string = '';
  finShow: string = '';
  filter = '';
  meseros = ['Rodrigo Matamala', 'Jose Gonzalez', 'Katherine Yañez', 'Pedro Vargas', 'María José Perez', 'Cristian Eiler', 'Diana Arevalo', 'Jesus Romero'];
  cajeros = ['Sebastian Hernandez', 'Michael Orletto', 'Katherine Yañez', 'Roberto Ortega'];

  // --------Table Variables para Ventas por Waiter-------
  ventasByWaiter: any[] = [];
  actions = [];
  columns = [
    {
      label: 'Fecha de Registro',
      attribute: 'date_opened',
      value: (element: any, index: number) => {
        if (element.fecha) return this.formatter.timestampFormat(element.fecha);
        else return 'Sin información';
      }
    },
  ];

  // --------Table Variables para Ventas por Cashier-------
  ventasByCashier: any[] = [];
  actionsCashier = [];
  columnsCashier = [
    {
      label: 'Fecha de Registro',
      attribute: 'date_opened',
      value: (element: any, index: number) => {
        if (element.fecha) return this.formatter.timestampFormat(element.fecha);
        else return 'Sin información';
      }
    },
  ];
  // ------Variables para Stacked Bar Chart de Ranked
  // ------de meseros mas rentables por Zona----------------------
  barChartMasRentables: any;
  leyendasMasRentables: any[] = [];
  dataMasRentables: any[] = [];
  optionsMasRentablesByZone = {
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      top: 25,
      type: 'scroll'
    },
    title: {
      text: 'Meseros Más Rentables Por Zona',
      textStyle: {
        fontSize: 15
      },
    },
    xAxis: {
      //Label Mesero
      type: 'category',
      data: ['Jorge Romero', 'Mauricio Sánchez', 'Mauricio Fredes', 'Mariave Díaz'],
      axisTick: { show: false },
      axisLabel: {
        interval: 0,
        rotate: 90,
        textStyle: {
          fontSize: 11
        },
      }
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        //Meseros por Zona
        name: 'Vip',
        type: 'bar',
        barGap: 0,
        emphasis: {
          focus: 'series'
        },
        stack: '1',
        data: [3000, 4500, 670, 12000]
      },
      {
        //Mesero
        name: 'Terraza',
        type: 'bar',
        barGap: 0,
        emphasis: {
          focus: 'series'
        },
        stack: '1',
        data: [3000, 4000, 5000]
      },
      {
        //Mesero
        name: 'Salón',
        type: 'bar',
        barGap: 0,
        emphasis: {
          focus: 'series'
        },
        stack: '1',
        data: [3000, 4000, 5000]
      }
    ],
  }
  // ------Variables para Stacked Bar Chart de Ranked
  // ------de meseros con más personas atendidas por Zona----------------------
  barChartMasPersonasAtendidas: any;
  leyendasMasAtendidas: any[] = [];
  dataMasAtendidas: any[] = [];
  optionsMasAtendidasByZone = {
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      top: 25,
      type: 'scroll'
    },
    title: {
      text: 'Meseros Con Más Personas Atendidas por Zona',
      textStyle: {
        fontSize: 15
      },
    },
    xAxis: {
      //Label Mesero
      type: 'category',
      data: [],
      axisTick: { show: false },
      axisLabel: {
        interval: 0,
        rotate: 90,
        textStyle: {
          fontSize: 11
        },
      }
    },
    yAxis: {
      type: 'value',
    },
    series: [],
  }
  // ------Variables para Stacked Bar Chart de Ranked
  // ------de meseros con mas ventas realizadas por Zona----------------------
  barChartMasVentas: any;
  leyendasMasVentas: any[] = [];
  dataMasVentas: any[] = [];
  optionsMasVentasByZone = {
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      top: 25,
      type: 'scroll'
    },
    title: {
      text: 'Meseros Con Más Ventas Realizadas por Zona',
      textStyle: {
        fontSize: 15
      },
    },
    xAxis: {
      //Label Mesero
      type: 'category',
      data: [],
      axisTick: { show: false },
      axisLabel: {
        interval: 0,
        rotate: 90,
        textStyle: {
          fontSize: 11
        },
      }
    },
    yAxis: {
      type: 'value',
    },
    series: [],
  }

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
    this.barChartMasRentables = echarts.init(<HTMLDivElement>document.getElementById('meseros-rentables-zona'));
    this.barChartMasRentables.setOption(this.optionsMasRentablesByZone);
    this.barChartMasPersonasAtendidas = echarts.init(<HTMLDivElement>document.getElementById('meseros-mas-personas-zona'));
    this.barChartMasPersonasAtendidas.setOption(this.optionsMasAtendidasByZone); this.loading.hide();
    this.barChartMasVentas = echarts.init(<HTMLDivElement>document.getElementById('meseros-mas-ventas-zona'));
    this.barChartMasVentas.setOption(this.optionsMasVentasByZone); this.loading.hide();

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

  onWaiterChanged(event: any) {
    console.log(event);
  }
  reload() {
    this.loading.show();
    this.loading.hide();
  }
}
