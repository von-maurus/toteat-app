import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReporteVentasComponent } from './reporte-ventas/reporte-ventas.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { AlertsComponent } from 'src/app/utils/alerts/alerts.component';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { KuvTableComponent, KuvTableModule } from 'kuv-table';

const routes: Routes = [
  { path: 'reporte-ventas', component: ReporteVentasComponent },
  { path: '', redirectTo: 'reporte-ventas', pathMatch: 'full' },
];
@NgModule({
  declarations: [
    ReporteVentasComponent, AlertsComponent, KuvTableComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    NgbAlertModule,
    KuvTableModule
  ]
})
export class VentasModule { }
