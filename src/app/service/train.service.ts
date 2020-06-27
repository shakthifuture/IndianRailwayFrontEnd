import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { ITrain } from '../model/train.model';

@Injectable({providedIn: 'root'})
export class TrainService {
    public resourceUrl = environment.apiUrl + '/api/train';
    
    constructor(private httpClient: HttpClient) { }

    public registerTrain(train: ITrain): Observable<ITrain> {
        return this.httpClient.post<ITrain>(this.resourceUrl+`/save`, train);
    }

    public getAllTrain(): Observable<ITrain[]> {
        return this.httpClient.get<ITrain[]>(this.resourceUrl+`/trains`);
    }
}