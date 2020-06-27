import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IStation } from '../model/station.model';
import { ScheduleService } from '../service/schedule.service';
import { ISchedule } from '../model/schedule.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {
  displayedColumns: string[] = ['id', 'trainNumber', 'sourceStationCode', 
  'desginationStationCode', 'arrivalTime', 'departureTime', 'sunday', 'monday', 'tuesday', 
  'wednesday', 'thursday', 'friday', 'saturday'];
  dataSource: any;
  @Input() selectedStation: IStation;
  scheduleList: ISchedule[];
  
  constructor(private scheduleService: ScheduleService) { }
  
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.selectedStation) {
      if(changes.selectedStation.currentValue) {
        this.searchSchedule();
      }
    }
  }

  searchSchedule() {
    this.scheduleService.search(this.selectedStation.id).subscribe((respone: ISchedule[]) => {
      this.scheduleList = respone;
      this.dataSource = this.scheduleList;
    });
  }

  ngOnInit(): void {

  }





}
