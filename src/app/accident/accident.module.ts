import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccidentListComponent } from './accident-list/accident-list.component';
import { AccidentDetailComponent } from './accident-detail/accident-detail.component';



@NgModule({
  declarations: [AccidentListComponent, AccidentDetailComponent],
  imports: [
    CommonModule
  ]
})
export class AccidentModule { }
