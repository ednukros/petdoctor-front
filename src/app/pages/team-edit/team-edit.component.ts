import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Employee } from 'src/app/interfaces/employee';
import { EmployeesService } from  'src/app/services/employee.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-team-edit',
  templateUrl: './team-edit.component.html',
  styleUrls: ['./team-edit.component.scss']
})
export class TeamEditComponent {
  form: FormGroup;
  id: number;
  task: String = "Nuevo "
  constructor(private fb: FormBuilder, private _employeeService: EmployeesService,private toastr: ToastrService, private router: Router, private aRouter: ActivatedRoute ) {
    
    this.id = Number(aRouter.snapshot.paramMap.get('id'));

    this.form = this.fb.group({
      name: '',
      email: '',
      password: '',
      userName: '',
      role: '',
      speciality: '',
      phoneNumber: '',


    });

  }


  ngOnInit(): void { 
    if (this.id != 0) {
      this.task = "Editar "
      this.getEmployee(this.id)
    }
  
  }
  addEmployee() {

    const employee: Employee = {
      name: this.form.value.name,
      email: this.form.value.email,
      password: this.form.value.password,
      userName: this.form.value.userName,
      role: this.form.value.role,
      speciality: this.form.value.speciality,
      phoneNumber: this.form.value.phoneNumber

    }

    if (this.id !== 0) {
      employee.id = this.id;
      this._employeeService.updateEmployee(this.id, employee).subscribe(() => {
        this.toastr.success('Veterinario actualizado con éxito', 'Veterinario actualizado')
        this.router.navigate(['/equipo'])

      })

    } else {
      this._employeeService.createEmployee(employee).subscribe(() => {
        console.log("Soy el nuevo empleado "+ employee );
        this.toastr.success('El veterinario ha sido guardado con éxito', 'Veterinario guardado')
        this.router.navigate(['/equipo'])


      })
    }



  }

  getEmployee(id: number) {
    this._employeeService.getEmployee(id).subscribe((data: Employee) => {
      this.form.setValue({
        
        name: data.name,
        speciality: data.speciality,
        email: data.email,

        role: data.role,
        phoneNumber: data.phoneNumber,
      userName:data.userName,
        password: data.password,


      })

    })

  }
}
