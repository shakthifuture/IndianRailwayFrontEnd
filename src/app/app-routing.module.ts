import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './helper/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminHomepageComponent } from './admin-homepage/admin-homepage.component';
import { TrainRegisterComponent } from './train-register/train-register.component';
import { StationRegisterComponent } from './station-register/station-register.component';
import { ScheduleCreatorComponent } from './schedule-creator/schedule-creator.component';


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminHomepageComponent },
  { path: 'train-register', component: TrainRegisterComponent },
  { path: 'station-register', component: StationRegisterComponent },
  { path: 'schedule-creator', component: ScheduleCreatorComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
