import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReporteTrabajadoresComponent } from './reporte-trabajadores/reporte-trabajadores.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'reporte-trabajadores', component: ReporteTrabajadoresComponent },
  { path: '', redirectTo: 'reporte-trabajadores', pathMatch: 'full' },
];

@NgModule({
  declarations: [ReporteTrabajadoresComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class TrabajadoresModule { }
