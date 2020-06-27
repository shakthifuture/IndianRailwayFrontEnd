import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TrainService } from '../service/train.service';
import { ITrain } from '../model/train.model';

@Component({
  selector: 'app-train-register',
  templateUrl: './train-register.component.html',
  styleUrls: ['./train-register.component.scss']
})
export class TrainRegisterComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  returnUrl: string;
  error = false;
  success = false;

  constructor(private formBuilder: FormBuilder, private trainService: TrainService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      trainNumber: ['', Validators.required],
      trainName: ['', Validators.required]
    });
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    const train: ITrain = {
      trainNumber: this.f.trainNumber.value,
      trainName: this.f.trainName.value
    }

    this.error = true;
    this.success = false;

    this.trainService.registerTrain(train).subscribe((response: ITrain) => {
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
