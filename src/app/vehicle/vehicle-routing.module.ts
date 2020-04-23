import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { VehicleDetailComponent } from './vehicle-detail/vehicle-detail.component';

const routes: Routes = [
  {
    path: 'list',
    component: VehicleListComponent
  },
  {
    path: 'detail/:id',
    component: VehicleDetailComponent
  },
  {
    path: 'detail/new',
    component: VehicleDetailComponent
  },
  {
    path: '',
    redirectTo: '/list',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleRoutingModule {}
