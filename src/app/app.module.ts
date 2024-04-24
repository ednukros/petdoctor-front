import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ChatComponent } from './shared/chat/chat.component';
import { PatientsComponent } from './pages/patients/patients.component';
import { DatesComponent } from './pages/dates/dates.component';
import { TeamComponent } from './pages/team/team.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ToastrModule } from 'ngx-toastr';

import { MatIconButton } from '@angular/material/button';
import { PatientDetailsComponent } from './pages/patient-details/patient-details.component';
import { PatientEditComponent } from './pages/patient-edit/patient-edit.component';
import { RouterModule } from '@angular/router';
import { TeamEditComponent } from './pages/team-edit/team-edit.component';
import { DateEditComponent } from './pages/date-edit/date-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    DashboardComponent,
    

    ChatComponent,

    TeamComponent,
    PatientDetailsComponent,
    PatientEditComponent,
    TeamEditComponent,
    DateEditComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    PatientsComponent,
    MatSortModule,
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      timeOut: 3500,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
     
  
    }),
    [HttpClientModule,
      MatInputModule,
      MatFormFieldModule
    // BrowserAnimationsModule
  ],
  
  ],
  exports: [ MatFormFieldModule, MatInputModule ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
