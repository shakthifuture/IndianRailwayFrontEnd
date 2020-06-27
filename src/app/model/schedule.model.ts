import { WeekDay, Time } from '@angular/common';
import { ITrain } from './train.model';
import { IStation } from './station.model';

export interface ISchedule {
    id?: number;
    train?: ITrain;
    sourceStation?: IStation;
    destinationStation?: IStation;
    arrivalTime?: Time;
    departureTime?: Time;
    sunday?: boolean;
    monday?: boolean;
    tuesday?: boolean;
    wednesday?: boolean;
    thursday?: boolean;
    friday?: boolean;
    saturday?: boolean;
}