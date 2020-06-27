import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { ISchedule } from '../model/schedule.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ScheduleService {

    public resourceUrl = environment.apiUrl + '/api/schedule';

    constructor(private http: HttpClient) { }

    search(stationId: number): Observable<ISchedule[]>{
        return this.http.get<ISchedule[]>(`${this.resourceUrl}/search/station/`+stationId);
    }

    saveSchedule(schedule: ISchedule): Observable<ISchedule>{
        return this.http.post<ISchedule>(`${this.resourceUrl}/save`, schedule);
    }

}