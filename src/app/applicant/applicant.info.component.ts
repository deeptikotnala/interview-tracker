import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../services/application.service';
import { Observable } from 'rxjs';
import { Application } from '../models/application.model';
import { Interview } from '../models/interviews.model';
import {ActivatedRoute} from "@angular/router";
import { ApplicantInterviewHistory } from '../models/applicant.int.history.model';

@Component({
  templateUrl: './applicant.info.component.html'
})

export class ApplicantInfo implements OnInit {

  applicantInfo: Application;
  interviews: ApplicantInterviewHistory[] = [];
  errorMessage = '';
  applicantId: number;
  firstName:string;

  constructor(private applicationService: ApplicationService, private route: ActivatedRoute) {
   }

  ngOnInit() {

    
    this.route.queryParams.subscribe(params => {
      this.applicantId = params['id'];
      this.applicationService.getApplicantById(this.applicantId).subscribe(
        res => {
          this.applicantInfo = res[0];
          this.applicationService.getAllInterviewsofApplicant(this.applicantId, this.applicantInfo.jobId).subscribe(
            res => {
              this.interviews = res;
            },
            error => this.errorMessage = <any>error
          );
        },
        error => this.errorMessage = <any>error
      );
  });

  }
}


