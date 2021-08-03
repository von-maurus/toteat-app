import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReporteVentasComponent } from './reporte-ventas/reporte-ventas.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'reporte-venta', component: ReporteVentasComponent },
];

@NgModule({
  declarations: [ReporteVentasComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes),
  ]
})
export class ReportesModule { }
