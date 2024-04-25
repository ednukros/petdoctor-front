import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientsService } from '../../services/patients.service';
import { Patient } from 'src/app/interfaces/patient';
// import { SwitchService } from 'src/app/services/switch-service';
// import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';


@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss']
})
export class PatientDetailsComponent implements OnInit {
  id: number;
  patient: any[] = [];
  modalSwitch:boolean = false;

  historic:string[] = ["05-02-2023","09-04-2023","14-08-2023","31-01-2024","05-04-2024"]
  constructor(
    private _patientsService: PatientsService,
    // private modalServ:SwitchService,
    private aRouter: ActivatedRoute,
    
  ) {
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.getPatient(this.id);
    console.log('patients details' + this.patient)

    // this.modalServ.$modal.subscribe((value)=>{this.modalSwitch = value})
  }
  openModal() {
    this.modalSwitch = true;
  }

  
  getPatient(id: number) {
    this._patientsService.getPatient(id)
      .subscribe((patientData: Patient) => {
        this.patient = [patientData];
        console.log('patients details' + this.patient)
      });
  }
}
