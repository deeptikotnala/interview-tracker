import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../services/application.service';
import { Observable } from 'rxjs';
import {DataSource} from '@angular/cdk/collections';
import { Application } from '../models/application.model';
import { Interview } from '../models/interviews.model';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit {

  pageTitle = "Dashboard";
  applications: Application[] = [];
  interviews: Interview[] = [];
  errorMessage = '';

  constructor(private applicationService: ApplicationService) { }

  ngOnInit() {

    this.applicationService.getLastApplications().subscribe(
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

