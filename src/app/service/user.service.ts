import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { User } from '../model/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
    public resourceUrl = environment.apiUrl + '/api/user';

    constructor(private http: HttpClient) { }

    registerUser(user: User) {
        return this.http.post<User[]>(`${this.resourceUrl}/register`, user);
    }
}