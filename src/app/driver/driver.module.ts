import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriverListComponent } from './driver-list/driver-list.component';
import { DriverDetailComponent } from './driver-detail/driver-detail.component';
import { DriverRoutingModule } from './driver-routing.module';



@NgModule({
  declarations: [DriverListComponent, DriverDetailComponent],
  imports: [
    CommonModule,
    DriverRoutingModule
  ]
})
export class DriverModule { }
