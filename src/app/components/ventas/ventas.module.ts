import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReporteVentasComponent } from './reporte-ventas/reporte-ventas.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'reporte-ventas', component: ReporteVentasComponent },
  { path: '', redirectTo: 'reporte-ventas', pathMatch: 'full' },
];
@NgModule({
  declarations: [
    ReporteVentasComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class VentasModule { }
