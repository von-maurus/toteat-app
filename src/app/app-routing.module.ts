import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'reporte-venta', pathMatch: 'full' },
  {
    path: 'reporte-venta',
    loadChildren: () => import('./components/ventas/ventas.module').then(m => m.VentasModule)
  },
  {
    path: 'reporte-trabajadores',
    loadChildren: () => import('./components/trabajadores/trabajadores.module').then(m => m.TrabajadoresModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
