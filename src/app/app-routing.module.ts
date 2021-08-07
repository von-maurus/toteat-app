import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReporteTrabajadoresComponent } from './components/trabajadores/reporte-trabajadores/reporte-trabajadores.component';
import { ReporteVentasComponent } from './components/ventas/reporte-ventas/reporte-ventas.component';

const routes: Routes = [
  { path: '', redirectTo: 'ventas', pathMatch: 'full' },
  {
    path: 'ventas', component: ReporteVentasComponent
  },
  {
    path: 'trabajadores', component: ReporteTrabajadoresComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
