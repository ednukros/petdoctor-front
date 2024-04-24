import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, EmailValidator } from '@angular/forms'
import { Date } from 'src/app/interfaces/date';
import { DatesService } from 'src/app/services/dates.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-date-edit',
  templateUrl: './date-edit.component.html',
  styleUrls: ['./date-edit.component.scss']
})
export class DateEditComponent implements OnInit{

  form: FormGroup;
  id: number;
  task: String = "Crear "

  constructor(private fb: FormBuilder, private _dateService: DatesService, private toastr: ToastrService, private router: Router, private aRouter: ActivatedRoute) {




    this.form = this.fb.group({
      dateOfAppointment: ['', Validators.required],
      namePatient: ['', Validators.required],
      nameCustomer: ['', Validators.required],
      vetAssigned: ['', Validators.required],
      
      // Validators.required,
      // Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    


    });

    // this.form = this.fb.group({
    //   name: ['', Validators.required],
    //   species:['', Validators.required],
    //   race:['', Validators.required],
    //   next_appointment:['', Validators.required],
    //   phoneNumber:[ '', Validators.required]




    // })

    this.id = Number(aRouter.snapshot.paramMap.get('id'));

  }
  ngOnInit(): void {
    if (this.id != 0) {
      this.task = "Editar "
      this.getDate(this.id)
    }

  }

  getDate(id: number) {
    this._dateService.getDate(id).subscribe((data: Date) => {
      this.form.setValue({
        dateOfAppointment: data.dateOfAppointment,
        namePatient: data.namePatient,
        nameCustomer: data.nameCustomer,
        vetAssigned: data.vetAssigned,
        
        


      })
      console.log(data)

    })
    console.log(id)
    
  }

  addDate() {

    const date: Date = {
      dateOfAppointment: this.form.value.name,
      namePatient: this.form.value.namePatient,
      nameCustomer: this.form.value.nameCustomer,
      vetAssigned: this.form.value.vetAssigned,
      
    }

    if (this.id !== 0) {
      date.id = this.id;
      this._dateService.updateDate(this.id, date).subscribe(() => {
        this.toastr.info('La cita ha sido actualizada con éxito', 'Cita actualizado')
        this.router.navigate(['/citas'])

      })

    } else {
      this._dateService.createDate(date).subscribe(() => {
        this.toastr.success('La cita ha sido creada con éxito', 'Cita creada')
        this.router.navigate(['/citas'])


      })
    }



  }
}


