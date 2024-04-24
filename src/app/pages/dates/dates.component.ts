import { Component, OnInit } from '@angular/core';
import { Date } from 'src/app/interfaces/date';
import { DatesService } from 'src/app/services/dates.service';
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
  selector: 'app-dates',
  templateUrl: './dates.component.html',
  styleUrls: ['./dates.component.scss'],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, NgFor, MatFormFieldModule, MatInputModule, MatButtonModule,RouterLink, RouterLinkActive, RouterOutlet]
})
export class DatesComponent implements AfterViewInit {
  displayedColumns: string[] = ['dateOfAppointment', 'namePatient', 'nameCustomer', 'vetAssigned', 'actions'];


  listDates: Date[] = []
  datasource = new MatTableDataSource<Date>(this.listDates);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  Date: any;


  constructor(public _dateService: DatesService, public toast:ToastrService) {

  }
  ngOnInit(): void {

    this.getListDates();

    console.log(this.datasource + "1")

  }
  ngAfterViewInit() {

    this.datasource.paginator = this.paginator;
    console.log(this.datasource + "1")

  }



  

  applyFilter(event: Event) {

    let filterValue = (event.target as HTMLInputElement).value
    if (filterValue != "") {
      const dateSearch = this.listDates.filter((date) => {
        return date.nameCustomer
          .toLowerCase()
          .includes(filterValue);

      }
      );

      this.listDates = dateSearch
      this.toasErrorSearch(dateSearch)



    } else {

      this.getListDates()



    }






  }

  toasErrorSearch(dateSearch: Date[]) {
    let $errormsg = document.querySelector(".errorsearch")
    let $inputElement = document.querySelector(".search-input");
    let $errorSearch = document.createElement("p");

    if (dateSearch.length == 0) {
      if (!$errormsg) {

        console.log(dateSearch)

        $errorSearch.className = "errorsearch";
        $inputElement?.appendChild($errorSearch)
        $errorSearch.textContent = "No existe ningún cita con ese id"


        console.log(2)
      }




    }

    if (this.listDates.length > 0) {

      $errorSearch.textContent = ""
    }




  }

  getListDates() {

    this._dateService.getDates()
      .subscribe((data: Date[]) => {
        this.listDates = data;
        console.log(data)
      }, (error: any) => {
        console.error('Error getting dates:', error);
      });
  }

  deleteDate(id: number) {
    this._dateService.deleteDate(id).subscribe(() => {

      this.getListDates();
      this.toast.warning('El paciente eliminado con éxito', 'Paciente eliminado')

    })



  }

}


