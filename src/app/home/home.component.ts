import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from '../model/user.model';
import { UserService } from '../service/user.service';
import { IStation } from '../model/station.model';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    loading = false;
    selectedStation: IStation;

    constructor(private userService: UserService,
        private router: Router,
        private authenticationService: AuthenticationService) { 
            if (this.authenticationService.currentUserValue.roles.includes('ADMIN')) { 
                this.router.navigate(['/admin']);
            }
        }
    

    ngOnInit() {
        this.loading = true;
        
    }

    transfer(event: IStation) {
        this.selectedStation = event;
    }
}