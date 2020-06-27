import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TrainService } from '../service/train.service';
import { StationService } from '../service/station.service';
import { ScheduleService } from '../service/schedule.service';
import { ITrain } from '../model/train.model';
import { IStation } from '../model/station.model';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ISchedule } from '../model/schedule.model';

@Component({
  selector: 'app-schedule-creator',
  templateUrl: './schedule-creator.component.html',
  styleUrls: ['./schedule-creator.component.scss']
})
export class ScheduleCreatorComponent implements OnInit {
  form: FormGroup;
  success = false;
  submitted = false;
  returnUrl: string;
  error = false;
  trains: ITrain[];
  filteredTrainOptions: Observable<IStation[]>;
  stations: IStation[];
  filteredStationOptions: Observable<IStation[]>;
  trainAuto: any;
  sameStation = false;
  mondayChecked = false;


  constructor(private formBuilder: FormBuilder,
    private trainService: TrainService,
    private stationService: StationService,
    private scheduleService: ScheduleService) { }
  

  ngOnInit(): void {
    this.loadTrains();
    this.loadStations();
    this.form = this.formBuilder.group({
      train: ['', Validators.required],
      sourceStation: ['', Validators.required],
      designStation: ['', Validators.required],
      arrivalTime: ['', Validators.required],
      depatureTime: ['', Validators.required],
      sunday: [false, Validators.required],
      monday: [false, Validators.required],
      tuesday: [false, Validators.required],
      wednesday: [false, Validators.required],
      thursday: [false, Validators.required],
      friday: [false, Validators.required],
      saturday: [false, Validators.required]
    }); 
  }

  displayFn(station: IStation): string {
    return station && station.stationName ? station.stationName : '';
  }

  displayFnTrain(train: ITrain): string {
    return train && train.trainName ? train.trainName : '';
  }

  private _filter(stationName: string): IStation[] {
    const filterValue = stationName.toLowerCase();
    return this.stations.filter(option => option.stationName.toLowerCase().indexOf(filterValue) >= 0);
  }

  private _filterTrain(trainName: string): IStation[] {
    const filterValue = trainName.toLowerCase();
    return this.trains.filter(option => option.trainName.toLowerCase().indexOf(filterValue) >= 0);
  }

  loadTrains(): void {
    this.trainService.getAllTrain().subscribe((response: ITrain[]) => {
      this.trains = response;
      if(this.trains.length !== 0) {
        this.filteredTrainOptions = this.form.valueChanges
        .pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.trainName),
          map(trainName => trainName ? this._filterTrain(trainName) : this.trains.slice())
        );
      }
    });
  }

  loadStations(): void {
    this.stationService.getAllStations().subscribe((response: IStation[]) => {
      this.stations = response;
      if(this.stations.length !== 0) {
        this.filteredStationOptions = this.form.valueChanges
        .pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.stationName),
          map(stationName => stationName ? this._filter(stationName) : this.stations.slice())
        );
      }
    });
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    this.sameStation = false;
    if(this.f.sourceStation.value === this.f.designStation.value) {
      this.sameStation = true;
      return;
    }

    //stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    const schedule: ISchedule = {
      train: this.f.train.value,
      sourceStation: this.f.sourceStation.value,
      destinationStation: this.f.designStation.value,
      arrivalTime: this.f.arrivalTime.value,
      departureTime: this.f.depatureTime.value,
      sunday: this.f.sunday.value,
      monday: this.f.monday.value,
      tuesday: this.f.tuesday.value,
      wednesday: this.f.wednesday.value,
      thursday: this.f.thursday.value,
      friday: this.f.friday.value,
      saturday: this.f.saturday.value
    }

    this.error = true;
    this.success = false;

    this.scheduleService.saveSchedule(schedule).subscribe((response: IStation) => {
      this.success = true;
      this.error = false;
      this.form.reset();
      this.submitted = false;
      if (!response && response.id === null) {
        this.error = false;
      }
    });
  }

}
