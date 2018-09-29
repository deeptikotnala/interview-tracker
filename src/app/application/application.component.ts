import { Component, OnInit } from '@angular/core';
import {ApplicationService} from '../services/application.service';
import {Interview} from '../models/interviews.model';
import {Application} from '../models/application.model';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {

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
