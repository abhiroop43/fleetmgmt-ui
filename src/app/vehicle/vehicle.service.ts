import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../app-config.module';
import { SearchList } from '../models/searchList.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient,
              @Inject(APP_CONFIG) private config: AppConfig) { }

  getVehiclesList(payload: SearchList) {
    return this.http.post(`${this.config.applicationApiUrl}api/Vehicle/getallvehicles`, payload);
  }
}
