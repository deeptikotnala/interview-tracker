import { Component, OnInit } from '@angular/core';
import {ApplicationService} from '../services/application.service';
import { JobDetails } from 'src/app/models/job.details.model';
import { Application } from 'src/app/models/application.model';
import { Interview } from 'src/app/models/interviews.model';
import { Router } from '@angular/router';

@Component({
  templateUrl: './new.interview.component.html',
  styleUrls: ['./interviews.component.css']
})
export class NewInterviewComponent implements OnInit {

  newApplication: Interview = new Interview();
  jobDetails: JobDetails[] = [];
  applicantDetails: Application[] = [];
  errorMessage = '';
  selectedJobId:Number = 0;
  selectedApplicantId:Number = 0;
  interviewtype: Number = 0;
  statusId: Number = 0;
  timezone:string = 'EST';

  constructor(private applicationService: ApplicationService, private router: Router) {

  }

  ngOnInit() {

    this.applicationService.getApplications().subscribe(
      res => {
        this.applicantDetails = res;
      },
      error => this.errorMessage = <any>error
    );

    console.log(this.applicantDetails);

  }

  public onjobChange(event): void {
    this.selectedJobId = event.target.value;
    console.log(this.selectedJobId);
  }

  public onApplicantChange(event): void {
    this.selectedApplicantId = event.target.value;
    console.log(this.selectedApplicantId);
    this.selectedJobId=0;
    for (let applicant of this.applicantDetails) {
      if(Number(applicant.id) == this.selectedApplicantId){
        this.selectedJobId=applicant.jobDetailId;
        break;
      }
    }
    console.log(this.applicantDetails);
    console.log(this.selectedJobId);
  }

  public onStatusChange(event): void {
    this.statusId = event.target.value;
  }

  public onInterviewTypeChange(event): void {
    this.interviewtype = event.target.value;
  }

  onTimezoneChange(event): void {
    this.timezone = event.target.value;
  }

  public onSubmit(){
    this.newApplication.applicantId = this.selectedApplicantId;
    this.newApplication.intTypeId = this.interviewtype;
    this.newApplication.intResultId = 5;
    this.newApplication.jobId=this.selectedJobId;
    this.newApplication.intTimeZone=this.timezone;
    this.applicationService.addNewInterview(this.newApplication)
      .subscribe(() =>  this.router.navigateByUrl('/interviews'));

  }

}
