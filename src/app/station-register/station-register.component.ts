import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IStation } from '../model/station.model';
import { StationService } from '../service/station.service';

@Component({
  selector: 'app-station-register',
  templateUrl: './station-register.component.html',
  styleUrls: ['./station-register.component.scss']
})
export class StationRegisterComponent implements OnInit {
  form: FormGroup;
  success = false;
  submitted = false;
  returnUrl: string;
  error = false;

  constructor(private formBuilder: FormBuilder, private stationService: StationService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      stationCode: ['', Validators.required],
      stationName: ['', Validators.required],
      longitude: '',
      latitude: ''
    });
  }

  get f() { return this.form.controls; }

  onSubmit(){
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    const station: IStation = {
      stationCode: this.f.stationCode.value,
      stationName: this.f.stationName.value,
      longitude: this.f.longitude===undefined?null:this.f.longitude.value,
      latitude: this.f.longitude===undefined?null:this.f.longitude.value,
    }

    this.error = true;
    this.success = false;

    this.stationService.registerStation(station).subscribe((response: IStation) => {
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
