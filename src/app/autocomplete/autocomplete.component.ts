import { Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { StationService } from '../service/station.service';
import { IStation } from '../model/station.model';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AutocompleteComponent implements OnInit {

  constructor(private stationService: StationService){}

  myControl = new FormControl();
  options: IStation[] ;
  filteredOptions: Observable<IStation[]>;
  @Output() selectedStationEvent = new EventEmitter<IStation>();

  ngOnInit() {
    this.stationService.getAllStations().subscribe((response: IStation[]) => {
      this.options = response;
      if(this.options.length !== 0) {
        this.filteredOptions = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.stationName),
          map(stationName => stationName ? this._filter(stationName) : this.options.slice())
        );
      }
    });
    
  }

  displayFn(station: IStation): string {
    return station && station.stationName ? station.stationName : '';
  }

  private _filter(stationName: string): IStation[] {
    const filterValue = stationName.toLowerCase();
    return this.options.filter(option => option.stationName.toLowerCase().indexOf(filterValue) >= 0);
  }

  public getSchedules(selectedStation: IStation) {
    this.selectedStationEvent.emit(selectedStation);
  }

}
