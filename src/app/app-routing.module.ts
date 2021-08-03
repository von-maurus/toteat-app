import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/reportes/reporte-venta', pathMatch: 'full' },
  {
    path: 'reportes',
    loadChildren: () => import('./components/reportes/reportes/reportes.module').then(m => m.ReportesModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
