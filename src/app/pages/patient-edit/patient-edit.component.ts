import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, EmailValidator } from '@angular/forms'
import { Patient } from 'src/app/interfaces/patient';
import { PatientsService } from 'src/app/services/patients.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.scss']
})
export class PatientEditComponent implements OnInit {

  form: FormGroup;
  id: number;
  task: String = "Nuevo "

  constructor(private fb: FormBuilder, private _patientService: PatientsService, private toastr: ToastrService, private router: Router, private aRouter: ActivatedRoute) {




    this.form = this.fb.group({
      name: ['', Validators.required],
      species: ['', Validators.required],
      race: ['', Validators.required],
      next_appointment: ['', Validators.required],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'), // Valida que solo se permitan dígitos.
          Validators.minLength(9),
          Validators.maxLength(9),
        ],
      ],
      owner: ['', Validators.required],
      email: ['', 
      // Validators.required,
      // Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ]


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
      this.getPatient(this.id)
    }

  }

  getPatient(id: number) {
    this._patientService.getPatient(id).subscribe((data: Patient) => {
      this.form.setValue({
        name: data.name,
        species: data.species,
        race: data.race,
        next_appointment: data.next_date,
        phoneNumber: data.phoneNumber,
        email: data.email,
        owner: data.owner,
        


      })
      console.log(data)

    })
    console.log(id)
    
  }

  addPatient() {

    const patient: Patient = {
      name: this.form.value.name,
      species: this.form.value.species,
      race: this.form.value.race,
      next_date: this.form.value.next_appointment,
      phoneNumber: this.form.value.phoneNumber,
      email: this.form.value.email,
      age: this.form.value.age,
      owner: this.form.value.owner

    }

    if (this.id !== 0) {
      patient.id = this.id;
      this._patientService.updatePatient(this.id, patient).subscribe(() => {
        this.toastr.success('El paciente ha sido actualizado con éxito', 'Paciente actualizado')
        this.router.navigate(['/pacientes'])

      })

    } else {
      this._patientService.createPatient(patient).subscribe(() => {
        this.toastr.success('El paciente ha sido guardado con éxito', 'Paciente guardado')
        this.router.navigate(['/pacientes'])


      })
    }



  }
}

