import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { environment } from 'src/environments/environment';
import { Patient } from '../interfaces/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = "http://localhost:3001/";
    this.myApiUrl = 'patients/'
   }

   getPatients(): Observable<Patient[]>{

    return this.http.get<Patient[]>(`${this.myAppUrl}${this.myApiUrl}`)

   }

   deletePatient(id: number): Observable<void>{

    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`)

   }

  //  editPatient(id:number): Observable<Patient[]> {

  //   return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}`)
  //  }

  createPatient(patient: Patient): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, patient)
  }

  getPatient(id: number): Observable<Patient>{

    return this.http.get<Patient>(`${this.myAppUrl}${this.myApiUrl}${id}`)

  }

  updatePatient(id:number, patient: Patient): Observable<void>{
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, patient)
  }

}
