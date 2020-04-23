import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DriverListComponent } from './driver-list/driver-list.component';
import { DriverDetailComponent } from './driver-detail/driver-detail.component';


const routes: Routes = [
  {
    path: 'list',
    component: DriverListComponent
  },
  {
    path: 'detail/:id',
    component: DriverDetailComponent
  },
  {
    path: 'detail/new',
    component: DriverDetailComponent
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
export class DriverRoutingModule { }
