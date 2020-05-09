import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { VehicleDetailComponent } from './vehicle-detail/vehicle-detail.component';
import { VehicleRoutingModule } from './vehicle-routing.module';
import { VehicleService } from './vehicle.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../auth/auth.interceptor';

@NgModule({
  declarations: [VehicleListComponent, VehicleDetailComponent],
  imports: [CommonModule, VehicleRoutingModule],
  providers: [
    VehicleService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
})
export class VehicleModule {}
