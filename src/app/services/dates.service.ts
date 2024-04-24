import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { environment } from 'src/environments/environment';
import { Date } from '../interfaces/date';
@Injectable({
  providedIn: 'root'
})
export class DatesService {

  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = "http://localhost:3001/";
    this.myApiUrl = 'citas/'
   }

   getDates(): Observable<Date[]>{

    return this.http.get<Date[]>(`${this.myAppUrl}${this.myApiUrl}`)

   }

   deleteDate(id: number): Observable<void>{

    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}borrar-cita/${id}`)

   }

  //  editDate(id:number): Observable<Date[]> {

  //   return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}`)
  //  }

  createDate(Date: Date): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}nueva-cita`, Date)
  }

  getDate(id: number): Observable<Date>{

    return this.http.get<Date>(`${this.myAppUrl}${this.myApiUrl}${id}`)

  }

  updateDate(id:number, Date: Date): Observable<void>{
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, Date)
  }

}

