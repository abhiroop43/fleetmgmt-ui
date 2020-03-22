import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'vehicle',
    loadChildren: () =>
      import('./vehicle/vehicle.module').then(m => m.VehicleModule)
  },
  {
    path: 'driver',
    loadChildren: () =>
      import('./driver/driver.module').then(m => m.DriverModule)
  },
  {
    path: 'trip',
    loadChildren: () => import('./trip/trip.module').then(m => m.TripModule)
  },
  {
    path: 'accident',
    loadChildren: () =>
      import('./accident/accident.module').then(m => m.AccidentModule)
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
