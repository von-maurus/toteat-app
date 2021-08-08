import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormatterService } from 'src/app/utils/formatter/formatter.service';

@Component({
  selector: 'app-venta-view',
  templateUrl: './venta-view.component.html',
  styleUrls: ['./venta-view.component.scss']
})
export class VentaViewComponent implements OnInit {
  @Input() venta: any;
  prodCols: any[] = [
    {
      label: 'Nombre',
      value: (element: any) => {
        return element.name;
      }
    },
    {
      label: 'Cantidad',
      value: (element: any) => {
        return element.quantity;
      }
    },
    {
      label: 'Valor Unitario',
      value: (element: any) => {
        return element.price.toLocaleString('de-DE');
      }
    },
    {
      label: 'Total',
      value: (element: any) => {
        return (element.price * element.quantity).toLocaleString('de-DE');
      }
    },
  ];
  prodActions = [];
  metCols: any[] = [
    {
      label: 'Nombre',
      value: (element: any) => {
        return element.type;
      }
    },
    {
      label: 'Monto',
      value: (element: any) => {
        return element.amount.toLocaleString('de-DE');
      }
    },
  ];
  metActions = [];
  products = [];
  payments = [];
  tiempoEnMesa: string = '';
  constructor(
    public activeModal: NgbActiveModal,
    private formatter: FormatterService,
  ) { }

  ngOnInit(): void {
    // Res: 0 hrs, 27 minutos
    let resta = Math.abs(new Date(this.venta.date_opened).getTime() - new Date(this.venta.date_closed).getTime()) / 1000;
    console.log(resta);
    // calculate days
    const days = Math.floor(resta / 86400);
    resta -= days * 86400;
    console.log('calculated days', days);
    // calculate hours
    const hours = Math.floor(resta / 3600) % 24;
    resta -= hours * 3600;
    console.log('calculated hours', hours);
    // calculate minutes
    const minutes = Math.floor(resta / 60) % 60;
    resta -= minutes * 60;
    console.log('minutes', minutes);

    this.tiempoEnMesa = hours.toString() + ' horas, ' + minutes + ' minutos';
    this.products = this.venta.products;
    this.payments = this.venta.payments;
    console.log('Venta', this.venta);
  }

}
