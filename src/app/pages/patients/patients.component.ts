import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/interfaces/patient';
import { PatientsService } from 'src/app/services/patients.service';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgFor } from '@angular/common';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { filter } from 'rxjs';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, NgFor, MatFormFieldModule, MatInputModule, MatButtonModule, RouterLink, RouterLinkActive, RouterOutlet]
})
export class PatientsComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'specie', 'owner', 'phoneNumber', 'actions'];


  listPatients: Patient[] = []
  datasource = new MatTableDataSource<Patient>(this.listPatients);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  Patient: any;


  constructor(public _patientService: PatientsService, public toast: ToastrService) {

  }
  ngOnInit(): void {

    this.getListPatients();

    console.log(this.datasource + "1")

  }
  ngAfterViewInit() {

    this.datasource.paginator = this.paginator;


  }





  applyFilter(event: Event) {
    let $inputElement = document.querySelector(".search-input");

    let filterValue = (event.target as HTMLInputElement).value
    if (filterValue != "") {
      const patientSearch = this.listPatients.filter((pat) => {
        return pat.name
          .toLowerCase()
          .includes(filterValue);

      }


      );

      this.listPatients = patientSearch

      
      if (patientSearch.length === 0) {
        if ($inputElement?.textContent !== "No existe ningún paciente con ese nombre") {
         
          $inputElement!.textContent="No existe ningún paciente con ese nombre";
          console.log("estoy en el if")
          console.log(patientSearch.length)

        }
      }else{
      console.log(patientSearch.length)
        console.log("estoy en el else")
        $inputElement!.textContent="";
      }

    } else {

      this.getListPatients()
      $inputElement!.textContent="";



    }






  }

  // toasErrorSearch() {
  //   let $errormsg = document.querySelector(".errorsearch")
  //   let $inputElement = document.querySelector(".search-input");
  //   let $errorSearch = document.createElement("p");

  //   if (!$errormsg) {
  //     if (this.listPatients.length == 0) {
  //       $errorSearch.className = "errorsearch";
  //       $inputElement?.appendChild($errorSearch)
  //       $errorSearch.textContent = "No existe ningún paciente con ese nombre"

  //     } else {

  //       $errorSearch.textContent = "Sí existe"
  //     }

  //   }






  //   if (this.listPatients.length > 0) {

  //     $errorSearch.textContent = ""
  //   }




  // }

  getListPatients() {

    this._patientService.getPatients()
      .subscribe((data: Patient[]) => {
        this.listPatients = data;
      }, (error: any) => {
        console.error('Error getting patients:', error);
      });
  }

  deletePatient(id: number) {
    this._patientService.deletePatient(id).subscribe(() => {

      this.getListPatients();
      this.toast.warning('El paciente eliminado con éxito', 'Paciente eliminado')

    })



  }

}

