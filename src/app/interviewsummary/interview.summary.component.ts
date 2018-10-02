import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../services/application.service';
import { Observable } from 'rxjs';

import {ActivatedRoute} from "@angular/router";
import { InterviewSummaryModel } from '../models/interview.summary.model';
import { Interview } from 'src/app/models/interviews.model';
import { Router } from '@angular/router';

@Component({
  templateUrl: './interview.summary.component.html'
})

export class InterviewSummary implements OnInit {

  interviews: InterviewSummaryModel;
  errorMessage = '';
  intId: number;
  newApplication: Interview = new Interview();
  selectedStatus: Number;


  constructor(private applicationService: ApplicationService, private route: ActivatedRoute,private router: Router) {
  }

  ngOnInit() {


    this.route.queryParams.subscribe(params => {
      this.intId = params['id'];
      this.applicationService.getInterviewSummary(this.intId).subscribe(
        res => {
          this.interviews = res[0];

        },
        error => this.errorMessage = <any>error
      );
    });

  }

  public onStatusChange(event): void {
    this.selectedStatus = event.target.value;
    console.log(this.selectedStatus);
  }


  public onSubmit(){

    console.log(this.interviews);
    this.newApplication.intResultId= this.selectedStatus;
    this.newApplication.id=this.interviews.id;
    this.newApplication.evaluatorComment=this.interviews.evaluatorComment;


    this.applicationService.updateInterview(this.newApplication)
      .subscribe(() =>  this.router.navigateByUrl('/interviews'));
  }
}


