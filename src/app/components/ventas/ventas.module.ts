import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReporteVentasComponent } from './reporte-ventas/reporte-ventas.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { AlertsComponent } from 'src/app/utils/alerts/alerts.component';
import { NgbAlertModule, NgbModalModule, NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxKuvUtilsComponent, NgxKuvUtilsModule } from 'ngx-kuv-utils';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { NgxKuvToolsComponent, NgxKuvToolsModule } from 'ngx-kuv-tools';
import { KuvTableComponent, KuvTableModule } from 'kuv-table';
import { VentaViewComponent } from './venta-view/venta-view.component';
export const options: Partial<IConfig> | (() => Partial<IConfig>) = null as any;

const routes: Routes = [
  { path: 'reporte-ventas', component: ReporteVentasComponent },
  { path: '', redirectTo: 'reporte-ventas', pathMatch: 'full' },
];
@NgModule({
  declarations: [
    ReporteVentasComponent,
    VentaViewComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgbAlertModule,
    NgbModule,
    NgxKuvUtilsModule,
    NgbModalModule,
    NgbNavModule,
    NgxMaskModule.forRoot(options),
    KuvTableModule,
    NgxKuvToolsModule
  ],
  exports: [NgxKuvUtilsComponent, KuvTableModule, KuvTableModule],

})
export class VentasModule { }
