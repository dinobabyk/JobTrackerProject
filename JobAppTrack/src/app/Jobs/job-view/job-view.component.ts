import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobListService } from '../../_services/job-list.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job-view',
  imports: [CommonModule],
  templateUrl: './job-view.component.html',
  styleUrl: './job-view.component.css'
})
export class JobViewComponent {
  id: any;
  jobData: any;
  constructor(private router: Router, private jobListSer: JobListService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });
    if (this.id != '0') {
      this.getJobData(this.id);
    }
  }
  getJobData(value: any) {
    this.jobListSer.getJobData(value).subscribe((data: any) => {
      this.jobData = data.response;
    })
  }
  backPage() {
    this.router.navigateByUrl('job-list');
  }
}
