import { Component, OnInit } from '@angular/core';
import { ExcelService } from 'src/app/services/excel/excel.service';
import { AlertService } from 'src/app/utils/alerts/alert.service';
import { FormatterService } from 'src/app/utils/formatter/formatter.service';
import { LoadingService } from 'src/app/utils/loading/loading.service';
import * as echarts from 'echarts';
import { TrabajadoresService } from 'src/app/services/trabajadores/trabajadores.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VentaViewComponent } from '../../venta-view/venta-view.component';

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
  // Card Variables
  meserosMasRentables: any[] = [
    {
      "nombre": '',
      "cantidad": 0
    }
  ];
  meserosMasPersonas: any[] = [
    {
      "nombre": '',
      "cantidad": 0
    }
  ];
  meserosMasVentas: any[] = [
    {
      "nombre": '',
      "cantidad": 0
    }
  ];
  // --------Table Variables para Ventas por Waiter-------
  ventasByWaiter: any[] = [];
  waiterActions = [
    {
      name: "\nDetalles",
      icon: "eye",
      action: (element: any, index: any) => {
        this.viewVenta(element, index);
      },
    },
  ];
  waiterColumns = [
    {
      label: 'Fecha de Registro',
      attribute: 'date_opened',
      value: (element: any) => {
        if (element.date_opened) return new Date(element.date_opened).toLocaleString('es-CL');
        else return '<div class="text-danger"><i>Sin Información</i></div>'
      },
      filter: { type: 'date' }
    },
    {
      label: 'Mesa',
      value: (element: any, index: number) => {
        return element.table;
      },
      filter: { value: 'value' }
    },
    {
      label: 'Zona',
      value: (element: any, index: number) => {
        return element.zone;
      },
      filter: { value: 'value' }
    },
    {
      label: 'Total',
      value: (element: any, index: number) => {
        return element.total.toLocaleString('de-DE');
      },
      filter: { value: 'value' }
    },
  ];
  lastWaiterSelected = ''
  // --------Table Variables para Ventas por Cashier-------
  ventasByCashier: any[] = [];
  actionsCashier = [
    {
      name: "\nDetalles",
      icon: "eye",
      action: (element: any, index: any) => {
        this.viewVenta(element, index);
      },
    },
  ];
  columnsCashier = [
    {
      label: 'Fecha de Registro',
      attribute: 'date_opened',
      value: (element: any) => {
        if (element.date_opened) return new Date(element.date_opened).toLocaleString('es-CL');
        else return '<div class="text-danger"><i>Sin Información</i></div>'
      },
      filter: { type: 'date' }
    },
    {
      label: 'Mesa',
      value: (element: any, index: number) => {
        return element.table;
      },
      filter: { value: 'value' }
    },
    {
      label: 'Zona',
      value: (element: any, index: number) => {
        return element.zone;
      },
      filter: { value: 'value' }
    },
    {
      label: 'Total',
      value: (element: any, index: number) => {
        return element.total.toLocaleString('de-DE');
      },
      filter: { value: 'value' }
    },
  ];
  lastCashierSelected = ''
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
      data: this.leyendasMasRentables,
      axisTick: { show: false },
      axisLabel: {
        interval: 0,
        rotate: 45,
        textStyle: {
          fontSize: 11
        },
      }
    },
    yAxis: {
      type: 'value',
    },
    series: [this.dataMasRentables],
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
      data: this.leyendasMasRentables,
      axisTick: { show: false },
      axisLabel: {
        interval: 0,
        rotate: 45,
        textStyle: {
          fontSize: 11
        },
      }
    },
    yAxis: {
      type: 'value',
    },
    series: [this.dataMasAtendidas],
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
      data: this.leyendasMasRentables,
      axisTick: { show: false },
      axisLabel: {
        interval: 0,
        rotate: 45,
        textStyle: {
          fontSize: 11
        },
      }
    },
    yAxis: {
      type: 'value',
    },
    series: [this.dataMasVentas],
  }

  constructor(
    private excel: ExcelService,
    private service: TrabajadoresService,
    private alerts: AlertService,
    private loading: LoadingService,
    private formatter: FormatterService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.loading.show();
    this.filter = 'annio';
    this.inicio = new Date(2019, 0, 1, -3, 0).toISOString().substr(0, 16);
    this.fin = new Date(2019, 0, 15, 20, 59).toISOString().substr(0, 16);
    this.inicioShow = this.formatter.timestampFormat(this.inicio);
    this.finShow = this.formatter.timestampFormat(this.fin);
    this.barChartMasRentables = echarts.init(<HTMLDivElement>document.getElementById('meseros-rentables-zona'));
    this.barChartMasPersonasAtendidas = echarts.init(<HTMLDivElement>document.getElementById('meseros-mas-personas-zona'));
    this.barChartMasVentas = echarts.init(<HTMLDivElement>document.getElementById('meseros-mas-ventas-zona'));
    this.barChartMasVentas.setOption(this.optionsMasVentasByZone); this.loading.hide();
    this.reload();
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
    this.loading.show();
    console.log(event);
    this.lastWaiterSelected = event;
    let inicioAux = ''
    let finAux = ''
    inicioAux = this.inicio.slice(0, 10) + ' ' + this.inicio.slice(11, 16);
    finAux = this.fin.slice(0, 10) + ' ' + this.fin.slice(11, 16);
    this.service.getVentasByWaiter(inicioAux, finAux, event).subscribe((res1: any) => {
      this.ventasByWaiter = res1;
      console.log(this.ventasByWaiter);
      this.loading.hide();
    }, (err) => console.error(err));
  }

  onCashierChanged(event: any) {
    this.loading.show();
    console.log(event);
    this.lastCashierSelected = event;
    let inicioAux = ''
    let finAux = ''
    inicioAux = this.inicio.slice(0, 10) + ' ' + this.inicio.slice(11, 16);
    finAux = this.fin.slice(0, 10) + ' ' + this.fin.slice(11, 16);
    this.service.getVentasByCashier(inicioAux, finAux, event).subscribe((res1: any) => {
      this.ventasByCashier = res1;
      console.log(this.ventasByCashier);
      this.loading.hide();
    }, (err) => console.error(err));
  }

  reload() {
    this.loading.show();
    let inicioAux = ''
    let finAux = ''
    inicioAux = this.inicio.slice(0, 10) + ' ' + this.inicio.slice(11, 16);
    finAux = this.fin.slice(0, 10) + ' ' + this.fin.slice(11, 16);
    this.service.getRankedWaiters(inicioAux, finAux).subscribe((res1: any) => {
      if (this.lastWaiterSelected != '' && this.lastWaiterSelected.length > 0) {
        this.service.getVentasByWaiter(inicioAux, finAux, this.lastWaiterSelected).subscribe((ventWaiters: any) => {
          this.ventasByWaiter = ventWaiters;
          console.log(this.ventasByWaiter);
          this.loading.hide();
        }, (err) => console.error(err));
      }
      if (this.lastCashierSelected != '' && this.lastCashierSelected.length > 0) {
        this.service.getVentasByCashier(inicioAux, finAux, this.lastCashierSelected).subscribe((cashier1: any) => {
          this.ventasByCashier = cashier1;
          console.log(this.ventasByCashier);
          this.loading.hide();
        }, (err) => console.error(err));
      }
      this.meserosMasRentables = res1[0].rentables;
      this.meserosMasPersonas = res1[0].masPersonas;
      this.meserosMasVentas = res1[0].masPedidos;

      // Por Zona
      let rentablesByZone: any[] = res1[0].rentablesByZone;
      let masPersonasByZone: any[] = res1[0].masPersonasByZone;
      let masVentasByZone: any[] = res1[0].masPedidosByZone;

      // Variables by zone
      this.dataMasRentables = [];
      this.dataMasAtendidas = [];
      this.dataMasVentas = [];
      this.leyendasMasRentables = [];
      this.leyendasMasAtendidas = [];
      this.leyendasMasVentas = [];
      console.log('Rent By Zone', rentablesByZone);
      // Bar Chart Mas Rentables By Zone
      this.calculateChartRentableByZone(rentablesByZone);
      // Bar Chart Mas Personas Atendidas By Zone
      this.calculateChartPersonasAtendidasByZone(masPersonasByZone);
      // Bar Chart Mas Ventas Atendidas By Zone
      this.calculateChartMasVentasByZone(masVentasByZone);
      this.loading.hide();
    }, (err) => console.error(err));
  }

  viewVenta(element: any, index: any) {
    const modalRef = this.modalService.open(VentaViewComponent, { windowClass: 'clear-modal', size: 'lg', scrollable: true });
    modalRef.componentInstance.venta = element;
    modalRef.result.then((result) => { }, (reason) => { });
  }

  calculateChartRentableByZone(rentablesByZone: any) {
    this.meseros.forEach((m) => {
      this.leyendasMasRentables.push(m);
    });
    this.leyendasMasRentables.forEach((name, indexLabel) => {
      rentablesByZone.forEach((venta: any) => {
        if (venta.nombre == name) {
          let index = this.dataMasRentables.findIndex((e) => e.name == venta.zone);
          if (index != -1) {
            this.dataMasRentables[index].data[indexLabel] = venta.cantidad;
          } else {
            this.dataMasRentables.push({
              name: venta.zone,
              type: 'bar',
              barGap: 0,
              emphasis: {
                focus: 'series'
              },
              stack: '1',
              data: [venta.cantidad]
            });
          }
        }
      });
    });
    this.optionsMasRentablesByZone.xAxis.data = this.leyendasMasRentables;
    this.optionsMasRentablesByZone.series = this.dataMasRentables;
    this.barChartMasRentables.setOption(this.optionsMasRentablesByZone);
  }

  calculateChartPersonasAtendidasByZone(masPersonasByZone: any) {
    this.leyendasMasRentables.forEach((name, indexLabel) => {
      masPersonasByZone.forEach((venta: any) => {
        if (venta.nombre == name) {
          let index = this.dataMasAtendidas.findIndex((e) => e.name == venta.zone);
          if (index != -1) {
            this.dataMasAtendidas[index].data[indexLabel] = venta.cantidad;
          } else {
            this.dataMasAtendidas.push({
              name: venta.zone,
              type: 'bar',
              barGap: 0,
              emphasis: {
                focus: 'series'
              },
              stack: '1',
              data: [venta.cantidad]
            });
          }
        }
      });
    });
    this.optionsMasAtendidasByZone.xAxis.data = this.leyendasMasRentables;
    this.optionsMasAtendidasByZone.series = this.dataMasAtendidas;
    this.barChartMasPersonasAtendidas.setOption(this.optionsMasAtendidasByZone); this.loading.hide();
  }

  calculateChartMasVentasByZone(masVentasByZone: any) {
    this.leyendasMasRentables.forEach((name, indexLabel) => {
      masVentasByZone.forEach((venta: any) => {
        if (venta.nombre == name) {
          let index = this.dataMasVentas.findIndex((e) => e.name == venta.zone);
          if (index != -1) {
            this.dataMasVentas[index].data[indexLabel] = venta.cantidad;
          } else {
            this.dataMasVentas.push({
              name: venta.zone,
              type: 'bar',
              barGap: 0,
              emphasis: {
                focus: 'series'
              },
              stack: '1',
              data: [venta.cantidad]
            });
          }
        }
      });
    });
    this.optionsMasVentasByZone.xAxis.data = this.leyendasMasRentables;
    this.optionsMasVentasByZone.series = this.dataMasVentas;
    this.barChartMasVentas.setOption(this.optionsMasVentasByZone);
  }
}
