import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
// import { Employee, IUserDB } from '../../interfaces/employee';
// import { EmployeesService } from 'src/app/services/employees-service';




@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})


export class NavbarComponent implements OnInit {
  userLoginOn:boolean=false;
  // userData!:IUserDB;

  public user!: string;


  constructor() { }
  // public auth: EmployeesService, private router: Router
  // ngOnDestroy(): void {
  //   this.auth.currentUserData.unsubscribe();
  //   this.auth.currentUserLoginOn.unsubscribe();

  // }

  ngOnInit(): void {
  //  this.auth.currentUserLoginOn.subscribe(
  //   {
  //     next:(userLoginOn) =>{
  //       this.userLoginOn=userLoginOn;
  //     }
  //  })
  //  this.auth.currentUserData.subscribe(
  //   {
  //     next:(userData) =>{
  //       this.userData=userData;
  //     }
  //  })
   
  }

  
  

// logOut(){
//   this.auth.logOut();

// }
}
