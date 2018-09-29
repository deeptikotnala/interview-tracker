import { Component, OnInit } from '@angular/core';
import {Interview} from '../models/interviews.model';
import {ApplicationService} from '../services/application.service';
import {Application} from '../models/application.model';

@Component({
  selector: 'app-interviews',
  templateUrl: './interviews.component.html',
  styleUrls: ['./interviews.component.css']
})
export class InterviewsComponent implements OnInit {

  applications: Application[] = [];
  interviews: Interview[] = [];
  errorMessage = '';

  constructor(private applicationService: ApplicationService) { }

  ngOnInit() {

    this.applicationService.getApplications().subscribe(
      res => {
        this.applications = res;
      },
      error => this.errorMessage = <any>error
    );

    this.applicationService.getInterviews().subscribe(
      res => {
        this.interviews = res;
      },
      error => this.errorMessage = <any>error
    );
  }

}
