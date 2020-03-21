import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripListComponent } from './trip-list/trip-list.component';
import { TripDetailComponent } from './trip-detail/trip-detail.component';



@NgModule({
  declarations: [TripListComponent, TripDetailComponent],
  imports: [
    CommonModule
  ]
})
export class TripModule { }
