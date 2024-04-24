import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/interfaces/employee';
import { EmployeesService } from '../../services/employee.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  listEmployees: Employee[] = []

  constructor(private _employeeService: EmployeesService, private toastr: ToastrService) {
}
  ngOnInit(): void {
    this.getListEmployees();
  }

  getListEmployees() {
    this._employeeService.getEmployees().subscribe((data: Employee[]) => {
      this.listEmployees = data;
      console.log(this.listEmployees);
      
    })
  }

  deleteEmployee(id: number) {
    this._employeeService.deleteEmployee(id).subscribe(() => {

        this.getListEmployees();
        this.toastr.warning('El paciente fue eliminado con éxito', 'Paciente eliminado')

    })
    
   
  
  }
}

