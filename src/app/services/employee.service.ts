import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { catchError, Observable, throwError, BehaviorSubject, tap } from 'rxjs';
// import { environment } from 'src/environments/environment';
import { Credentials, Employee, IUserDB } from '../interfaces/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private myAppUrl: string;
  private myApiUrl: string;
  private loginurl: string;
  private registerurl: string;
  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<IUserDB> = new BehaviorSubject<IUserDB>({token:"",user:""} );

  constructor(private http: HttpClient) {
    this.myAppUrl = "http://localhost:3001/"
    this.myApiUrl = 'equipo/'
    this.loginurl = 'login'
    this.registerurl = 'registro'


  }
  public headers = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    })
  }
  login(user: Credentials): Observable<IUserDB> {


    // return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}${this.loginurl}`,user);
    return this.http.post<IUserDB>(`http://localhost:3001/employees/login`, user).pipe(
      tap( (userData: IUserDB) => {
        localStorage.setItem('userData', JSON.stringify(userData.user));
        this.currentUserData.next(userData);
        this.currentUserLoginOn.next(true);

      }),
      catchError(this.handleError)
    )

  }
  getEmployees(): Observable<Employee[]> {

    return this.http.get<Employee[]>(`${this.myAppUrl}${this.myApiUrl}`)

  }

  deleteEmployee(id: number): Observable<void> {

    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}borrar/${id}`)

  }

  //  editEmployee(id:number): Observable<Employee[]> {

  //   return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}`)
  //  }

  createEmployee(employee: Employee): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}${this.registerurl}`, employee)
  }

  getEmployee(id: number): Observable<Employee> {

    return this.http.get<Employee>(`${this.myAppUrl}${this.myApiUrl}${id}`)

  }

  updateEmployee(id: number, employee: Employee): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, employee)
  }


  
  logOut() {
    localStorage.clear();
  }





  getToken() {
    return localStorage.getItem('token');
  }

  getUser(user: string) {
    JSON.parse(String(localStorage.getItem('user')));
    return user;
  }

  checkSession(): Observable<any> {
    return this.http.post(this.myAppUrl + "users/checksession", this.headers).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Se ha producido un error ', error)
    } else {
      console.error('El backend retornó el código de estado ', error.status, error.error)

    }
    return throwError(() => ('Algo falló. Por favor intente de nuevo'));
  }

  get userData():Observable<IUserDB>{
    return this.currentUserData.asObservable();
  }
  get userLoginOn():Observable<boolean>{
    return this.currentUserLoginOn.asObservable();
  }

}
