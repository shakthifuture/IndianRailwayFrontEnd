import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IStation } from '../model/station.model';
import { environment } from '../environments/environment';

@Injectable({providedIn: 'root'})
export class StationService {
    public resourceUrl = environment.apiUrl + '/api/station';
    
    constructor(private httpClient: HttpClient) { }

    public searchStation(query: string): Observable<IStation[]> {
        let params = new HttpParams().set('query', query);
        return this.httpClient.get<IStation[]>(this.resourceUrl+`/search`, {params: params});
    }

    public getAllStations(): Observable<IStation[]> {
        return this.httpClient.get<IStation[]>(`${this.resourceUrl}/stations`);
    }

    public registerStation(station: IStation): Observable<IStation> {
        return this.httpClient.post<IStation>(this.resourceUrl+`/save`, station);
    }
}