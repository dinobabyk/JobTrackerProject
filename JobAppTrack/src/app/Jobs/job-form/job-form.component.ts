import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JobListService } from '../../_services/job-list.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-job-form',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelect, MatOption],
  templateUrl: './job-form.component.html',
  styleUrl: './job-form.component.css'
})
export class JobFormComponent {
  jobForm!: FormGroup;
  id: any;
  jobData: any;
  saveClick:boolean =false;
  updateClick:boolean =false;
  statusList: any[] = [
    { value: 'Pending' },
    { value: 'InterviewProcess' },
    { value: 'OfferProcess' },
    { value: 'Rejected' }
  ];
  constructor(private router: Router, private formBuilder: FormBuilder, private jobListSer: JobListService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });
    this.form_load();
    if (this.id != '0') {
      this.getJobData(this.id);
    }
  }
  form_load() {
    this.jobForm = this.formBuilder.group({
      companyName: ['', Validators.required],
      position: ['', Validators.required],
      description: [''],
      status: ['', Validators.required],
      createdBy: [''],
      modifiedBy: ['']
    });
  }
  backPage() {
    this.router.navigateByUrl('job-list');
  }
  onSubmitSave() {
    this.saveClick = true;
    const isFormValid = this.jobForm.valid;
    if (!isFormValid) {
      this.saveClick = false;
      return;
    }
    this.jobForm.patchValue({ createdBy: sessionStorage.getItem('username') })
    this.jobListSer.jobAdd(this.jobForm.value).subscribe((res: any) => {
      if (res.status == true) {
        Swal.fire({
          title: 'Success',
          text: 'Saved Successfully',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        this.router.navigate(['/job-list']);
      } else {
        this.saveClick = false;
        Swal.fire({
          title: 'Error!',
          text: 'Something went wrong.!',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    });
  }
  onSubmitUpdate() {
    this.updateClick = true;
    const isFormValid = this.jobForm.valid;
    if (!isFormValid) {
      this.updateClick = false;
      return;
    }
    this.jobForm.patchValue({ modifiedBy: sessionStorage.getItem('username') })
    this.jobListSer.jobUpdate(this.id, this.jobForm.value).subscribe((res: any) => {
      if (res.status == true) {
        Swal.fire({
          title: 'Success',
          text: 'Updated Successfully',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        this.router.navigate(['/job-list']);
      } else {
        this.updateClick = false;
        Swal.fire({
          title: 'Error!',
          text: 'Something went wrong.!',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    });
  }
  getJobData(value: any) {
    this.jobListSer.getJobData(value).subscribe((data: any) => {
      this.jobData = data.response;
      // setTimeout(() => {
      this.jobForm.patchValue(this.jobData)
      // }, 1000);

    })
  }
  clearAll() {
    this.jobForm.reset();
  }
}
