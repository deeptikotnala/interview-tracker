import {Component, OnInit} from '@angular/core';
import {ApplicationService} from '../services/application.service';
import {JobDetails} from 'src/app/models/job.details.model';
import {Application} from 'src/app/models/application.model';
import {Router} from '@angular/router';

@Component({
  templateUrl: './new.application.component.html',
  styleUrls: ['./application.component.css']
})
export class NewApplicationComponent implements OnInit {

  newApplication: Application = new Application();
  jobDetails: JobDetails[] = [];
  errorMessage = '';
  selectedJobId: Number = 0;
  sponsorshipReq: Number = 0;

  constructor(private applicationService: ApplicationService, private router: Router) {

  }

  ngOnInit() {

    this.applicationService.getJobDetails().subscribe(
      res => {
        this.jobDetails = res;
      },
      error => this.errorMessage = <any>error
    );

    console.log(this.jobDetails);
  }

  public onjobChange(event): void {
    this.selectedJobId = event.target.value;
    console.log(this.selectedJobId);
  }

  public onSponsorshipChange(event): void {
    this.sponsorshipReq = event.target.value;
    console.log(this.sponsorshipReq);
  }

  public onSubmit() {
    this.newApplication.jobDetailId = this.selectedJobId;
    this.newApplication.sponsorshipReq = this.sponsorshipReq;
    this.applicationService.addNewApplication(this.newApplication)
      .subscribe(() => this.router.navigateByUrl('/applications'));
  }
}
