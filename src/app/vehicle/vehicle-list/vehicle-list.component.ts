import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../vehicle.service';
import { SearchList } from 'src/app/models/searchList.model';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {

  searchPayload: SearchList = {
    pageNumber: 1,
    pageSize: 15,
    filters: []
  };

  constructor(private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.vehicleService.getVehiclesList(this.searchPayload).subscribe(
      (res) => console.log('Vehicles received', res),
      (err) => console.warn('Error occurred', err)
    );
  }

}
