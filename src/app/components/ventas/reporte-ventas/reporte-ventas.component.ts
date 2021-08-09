import { Component, OnInit } from '@angular/core';
import { ExcelService } from 'src/app/services/excel/excel.service';
import { VentasService } from 'src/app/services/ventas/ventas.service';
import { AlertService } from 'src/app/utils/alerts/alert.service';
import { LoadingService } from 'src/app/utils/loading/loading.service';
import * as echarts from 'echarts';
import { FormatterService } from 'src/app/utils/formatter/formatter.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VentaViewComponent } from '../../trabajadores/venta-view/venta-view.component';

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
  filter: string = 'mes';

  // Variables Card y posibles graficos
  totalIngresos: any = [{
    'totalAmount': 0
  }];
  productsMasRentables: any = [
    {
      "name": '',
      "category": '',
      "total": 0
    }
  ];
  productsMasVendidos: any = [
    {
      "name": '',
      "cantidad": 1,
      "montoTotal": 0
    }

  ];
  categMasRent: any = [
    {
      "name": '',
      "total": ''
    }
  ];
  metPagosMasRent: any = [
    {
      "nombre": '',
      "montoTotal": 0
    }
  ];
  metPagosMasUsado: any = [
    {
      "nombre": '',
      "cantidad": 1,
      "monto": 0
    }
  ];
  zonaMasRentable: any = [
    {
      "zone": '',
      "montoTotal": 0
    }
  ];
  diasMasRentables: any = [
    {
      "dia": '',
      "montoTotal": 0
    }
  ];

  // Table Variables para Ventas
  ventas: any[] = [];
  actions = [
    {
      name: "\nDetalles",
      icon: "eye",
      action: (element: any, index: any) => {
        this.viewVenta(element, index);
      },
    },
  ];
  ventasCols = [
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
      label: 'Mesero',
      value: (element: any, index: number) => {
        return element.waiter;
      },
      filter: { value: 'value' }
    },
    {
      label: 'Cajero',
      value: (element: any, index: number) => {
        return element.cashier;
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

  // ------Ingresos Line Chart------
  lineChartIngresos: any;
  leyendasLineChart: any[] = [];
  dataLineChart: any[] = [];
  optionIngresosLine = {
    title: {
      text: 'Ingresos'
    },
    grid: { bottom: 100, left: 100 },
    tooltip: {
      trigger: 'axis'
    },
    toolbox: {
      show: true,
      feature: {
        dataView: { readOnly: false },
      }
    },
    xAxis: {
      // Fechas
      axisLabel: { rotate: 25 },
      type: 'category',
      data: this.leyendasLineChart,
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: this.dataLineChart,
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
    toolbox: {
      show: true,
      feature: {
        dataView: { readOnly: false },
      }
    },
    grid: { bottom: 100, left: 100 },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [0, 0, 0, 0, 0, 0, 0],
        type: 'bar',
        name: 'Ingresos',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }
    ]
  };

  constructor(
    private excel: ExcelService,
    private service: VentasService,
    private alerts: AlertService,
    private loading: LoadingService,
    private formatter: FormatterService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.loading.show();
    this.inicio = new Date(2019, 0, 1, 3, 0).toISOString().substr(0, 16);
    this.fin = new Date(2019, 0, 2, 20, 59).toISOString().substr(0, 16);
    this.inicioShow = this.formatter.timestampFormat(this.inicio);
    this.finShow = this.formatter.timestampFormat(this.fin);
    this.barChartDiasRentables = echarts.init(<HTMLDivElement>document.getElementById('dias-rentables-bar-chart'));
    this.lineChartIngresos = echarts.init(<HTMLDivElement>document.getElementById('ingresos-line-chart'));
    this.reload();
    this.lineChartIngresos.setOption(this.optionIngresosLine);
  }

  loadLineChart() {
    this.lineChartIngresos = echarts.init(<HTMLDivElement>document.getElementById('ingresos-line-chart'));
    this.lineChartIngresos.setOption(this.optionIngresosLine);
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

  reloadIngresosLineChart(ventas: any) {
    console.log('Filter', this.filter);
    let inicioAux = ''
    let finAux = ''
    inicioAux = this.inicio.slice(0, 10) + ' ' + this.inicio.slice(11, 16);
    finAux = this.fin.slice(0, 10) + ' ' + this.fin.slice(11, 16);
    let ingresosAux = [];
    this.leyendasLineChart = [];
    this.dataLineChart = [];
    this.optionIngresosLine.series[0].data = [];
    this.optionIngresosLine.xAxis.data = [];
    if (true) {
      // Fechas
      let dia = new Date(inicioAux + ':00').getDate();
      let mes = new Date(inicioAux + ':00').getMonth();
      let annio = new Date(inicioAux + ':00').getFullYear();
      let fechaInicio: any;
      let fechaTermino: any;
      let i = 0;
      let j = 0;
      ingresosAux = ventas;
      fechaInicio = new Date(annio, mes, dia, 0, 0, 0);
      fechaTermino = new Date(finAux + ':00');
      console.log('Fecha Inicio<=FechaTermino', fechaInicio <= fechaTermino);
      // console.log('Fecha Termino', fechaTermino);
      switch (this.filter) {
        case 'dia':
          ingresosAux.sort((a: any, b: any) => {
            if (a.date_opened > b.date_opened) return 1;
            else if (a.date_opened < b.date_opened) return -1;
            else return 0;
          });
          while (fechaInicio <= fechaTermino) {
            this.dataLineChart[j] = 0;
            this.leyendasLineChart.push(fechaInicio.toLocaleDateString('es-CL'));
            while (ingresosAux.length > i && ingresosAux[i].date_opened.substr(0, 10) <= fechaInicio.toISOString().substr(0, 10)) {
              this.dataLineChart[j] += ingresosAux[i].total;
              i++;
            }
            dia++;
            fechaInicio = new Date(annio, mes, dia);
            j++;
          }
          this.optionIngresosLine.series[0].data = this.dataLineChart;
          this.optionIngresosLine.xAxis.data = this.leyendasLineChart;
          this.loading.hide();
          break;
        case 'mes':
          dia = 1;
          this.optionIngresosLine.series[0].data = [];
          this.optionIngresosLine.xAxis.data = [];
          ingresosAux.sort((a: any, b: any) => {
            if (a.date_opened > b.date_opened) return 1;
            else if (a.date_opened < b.date_opened) return -1;
            else return 0;
          });
          while (fechaInicio <= fechaTermino) {
            this.dataLineChart[j] = 0;
            console.log('mes', fechaInicio.toLocaleDateString('es-CL').substr(3, 7));
            this.leyendasLineChart.push(fechaInicio.toLocaleDateString('es-CL').substr(3, 7));
            while (ingresosAux.length > i && ingresosAux[i].date_opened.substr(0, 7) <= fechaInicio.toISOString().substr(0, 7)) {
              this.dataLineChart[j] += ingresosAux[i].total;
              i++;
            }
            mes++;
            fechaInicio = new Date(annio, mes, dia);
            j++;
          }
          this.optionIngresosLine.series[0].data = this.dataLineChart;
          this.optionIngresosLine.xAxis.data = this.leyendasLineChart;
          this.loading.hide();
          break;
        case 'annio':
          dia = 1;
          mes = 0;
          ingresosAux.sort((a: any, b: any) => {
            if (a.date_opened > b.date_opened) return 1;
            else if (a.date_opened < b.date_opened) return -1;
            else return 0;
          });
          while (fechaInicio <= fechaTermino) {
            this.dataLineChart[j] = 0;
            this.leyendasLineChart.push(fechaInicio.toLocaleDateString('es-CL').substr(6, 4));
            while (ingresosAux.length > i && ingresosAux[i].date_opened.substr(0, 4) <= fechaInicio.toISOString().substr(0, 4)) {
              this.dataLineChart[j] += ingresosAux[i].total;
              i++;
            }
            annio++;
            fechaInicio = new Date(annio, mes, dia);
            j++;
          }
          this.optionIngresosLine.series[0].data = this.dataLineChart;
          this.optionIngresosLine.xAxis.data = this.leyendasLineChart;
          this.loading.hide();
          break;
        default:
          break;
      }
      this.lineChartIngresos?.setOption(<any>this.optionIngresosLine);
    }
  }

  reload() {
    this.loading.show();
    let inicioAux = ''
    let finAux = ''
    inicioAux = this.inicio.slice(0, 10) + ' ' + this.inicio.slice(11, 16);
    finAux = this.fin.slice(0, 10) + ' ' + this.fin.slice(11, 16);
    console.log(inicioAux);
    console.log(finAux);
    this.service.getVentasByDate(inicioAux, finAux).subscribe((res1: any) => {
      this.service.getProductosMasRentables(inicioAux, finAux).subscribe((res2: any) => {
        this.service.getProdMasVendidos(inicioAux, finAux).subscribe((res3: any) => {
          this.service.getCategMasRentables(inicioAux, finAux).subscribe((res4: any) => {
            this.service.getRankedMetodos(inicioAux, finAux).subscribe((res5: any) => {
              this.service.getVentasByZone(inicioAux, finAux).subscribe((res6: any) => {
                this.service.getIngresosPerDay(inicioAux, finAux).subscribe((res7: any) => {
                  this.service.getIngresoTotal(inicioAux, finAux).subscribe((res8: any) => {
                    this.ventas = res1;
                    this.totalIngresos = res8;
                    this.productsMasRentables = res2;
                    this.productsMasVendidos = res3;
                    this.categMasRent = res4;
                    this.metPagosMasRent = res5[0].masRentables;
                    this.metPagosMasUsado = res5[0].masUsados;
                    this.zonaMasRentable = res6;
                    this.diasMasRentables = res7;
                    this.diasMasRentables.forEach((d: any) => {
                      let index = this.optionDiasMasRentables.xAxis.data.findIndex((e) => e == d.dia);
                      if (index != -1) {
                        this.optionDiasMasRentables.series[0].data[index] = d.montoTotal;
                      }
                    });
                    console.log('Dias mas rent', this.diasMasRentables);
                    console.log('met pag mas usad', this.metPagosMasUsado);
                    this.barChartDiasRentables.setOption(this.optionDiasMasRentables)
                    this.reloadIngresosLineChart(this.ventas);
                  }, (err) => { console.error(err + ' Ingresos totales') });
                });
              });
            });
          });
        }, (err) => console.error(err));
      }, (err) => console.error(err));
      // console.log(res);
    }, (err) => console.error(err));
  }

  dia() {
    this.filter = 'dia';
    this.reloadIngresosLineChart(this.ventas);
  }

  mes() {
    this.filter = 'mes';
    this.reloadIngresosLineChart(this.ventas);
  }

  anio() {
    this.filter = 'annio';
    this.reloadIngresosLineChart(this.ventas);
  }

  viewVenta(element: any, index: any) {
    const modalRef = this.modalService.open(VentaViewComponent, { windowClass: 'clear-modal', size: 'lg', scrollable: true });
    modalRef.componentInstance.venta = element;
    modalRef.result.then((result) => { }, (reason) => { });
  }
}
