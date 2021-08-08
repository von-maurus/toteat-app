import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReporteTrabajadoresComponent } from './components/trabajadores/reporte-trabajadores/reporte-trabajadores.component';
import { ReporteVentasComponent } from './components/ventas/reporte-ventas/reporte-ventas.component';

const routes: Routes = [
  { path: '', redirectTo: 'ventas', pathMatch: 'full' },
  {
    path: 'ventas',
    loadChildren: () => import('./components/ventas/ventas.module').then(m => m.VentasModule)
  },
  {
    path: 'trabajadores', component: ReporteTrabajadoresComponent,
    loadChildren: () => import('./components/trabajadores/trabajadores.module').then(m => m.TrabajadoresModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
