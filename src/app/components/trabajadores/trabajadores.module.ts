import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReporteTrabajadoresComponent } from './reporte-trabajadores/reporte-trabajadores.component';
import { RouterModule, Routes } from '@angular/router';
import { NgxKuvUtilsModule } from 'ngx-kuv-utils';
import { NgxKuvToolsModule } from 'ngx-kuv-tools';
import { FormsModule } from '@angular/forms';
import { NgbModalModule, NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { VentaViewComponent } from '../venta-view/venta-view.component';

const routes: Routes = [
  { path: 'reporte-trabajadores', component: ReporteTrabajadoresComponent },
  { path: '', redirectTo: 'reporte-trabajadores', pathMatch: 'full' },
];

@NgModule({
  declarations: [ReporteTrabajadoresComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxKuvUtilsModule,
    NgxKuvToolsModule,
    FormsModule,
    NgbModalModule,
    NgbNavModule,
    NgbModule
  ],
  entryComponents: [
    VentaViewComponent
  ]
})
export class TrabajadoresModule { }
