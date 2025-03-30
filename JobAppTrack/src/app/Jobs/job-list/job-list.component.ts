import { Component, TemplateRef, ViewChild } from '@angular/core';
import { JobListService } from '../../_services/job-list.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog, MatDialogActions } from '@angular/material/dialog';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import Swal from 'sweetalert2';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-job-list',
  imports: [CommonModule, ReactiveFormsModule, MatDialogActions, MatFormFieldModule, MatInputModule, MatSelect, MatOption, MatPaginatorModule],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.css'
})
export class JobListComponent {
  itemCount : number=0;
  pageLength : number=5;
  pageNumber : number=0;
  @ViewChild('callAPIDialog') callAPIDialog: any;
  statusForm!: FormGroup;
  statusList: any[] = [
    { value: 'Pending' },
    { value: 'InterviewProcess' },
    { value: 'OfferProcess' },
    { value: 'Rejected' }
  ];
  constructor(private jobListSer: JobListService, private router: Router, private dialog: MatDialog, private formBuilder: FormBuilder) { }
  appList: any = [];
  form_load() {
    this.statusForm = this.formBuilder.group({
      id: ['', Validators.required],
      status: ['', Validators.required],
      modifiedBy: ['dino']
    });
  }
  ngOnInit() {
    this.jobList();
  }
  handlePageEvent(e: PageEvent) {
    console.log(e);
    this.itemCount = e.length;
    this.pageLength = e.pageSize;
    this.pageNumber = e.pageIndex;
    this.jobList();
  }
  jobList() {
    this.jobListSer.jobList(this.pageNumber,this.pageLength).subscribe((data: any) => {
      this.appList = data.response;
      this.itemCount = data.itemCount;
    })
  }
  addNew() {
    // this.router.navigateByUrl('job-form/0');
    this.router.navigate(['/job-form'], { queryParams: { id: 0 } });

  }
  edit(id_value: any) {
    this.router.navigate(['/job-form'], { queryParams: { id: id_value } });
  }
  view(id_value: any) {
    this.router.navigate(['/job-view'], { queryParams: { id: id_value } });
  }
  statusPopup(idVal: any, statusVal: any) {
    this.form_load();
    this.dialog.open(this.callAPIDialog);
    this.statusForm.patchValue({ id: idVal, status: statusVal, modifiedBy: sessionStorage.getItem('username') });
  }
  closePopup() {
    this.dialog.closeAll();
  }
  updateStatus() {
    const isFormValid = this.statusForm.valid;
    if (!isFormValid) {
      return;
    }
    this.jobListSer.statusUpdate(this.statusForm.value.id, this.statusForm.value.status).subscribe((res: any) => {
      if (res.status == true) {
        Swal.fire({
          title: 'Success',
          text: 'Status Updated Successfully',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        this.jobList();
        this.dialog.closeAll();
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Something went wrong.!',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    });
  }
}
