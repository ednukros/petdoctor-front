import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PatientsComponent } from './pages/patients/patients.component';
import { TeamComponent } from './pages/team/team.component';
import { DatesComponent } from './pages/dates/dates.component';
import { PatientEditComponent } from './pages/patient-edit/patient-edit.component';
import { PatientDetailsComponent } from './pages/patient-details/patient-details.component';
//components

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path:'crear', component: PatientEditComponent},

  { path: 'pacientes', component: PatientsComponent },
  { path: 'equipo', component: TeamComponent },
  { path: 'citas', component: DatesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path:'editar/:id', component: PatientEditComponent},
  // { path:'patient/:id', component: PatientDetailsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes), ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

