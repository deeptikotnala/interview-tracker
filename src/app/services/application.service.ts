import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Application } from '../models/application.model';
import { Interview } from '../models/interviews.model';
import { JobDetails } from 'src/app/models/job.details.model';
import { HttpHeaders } from '@angular/common/http';
import { ApplicantInterviewHistory } from 'src/app/models/applicant.int.history.model';
import { InterviewSummaryModel } from 'src/app//models/interview.summary.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private applicationUrl = 'api/applications.json';
  private interviewsUrl = 'http://localhost:8080/getInterviewDetails';
  private apiUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  getApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(this.apiUrl+'getAllApplications').pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getLastApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(this.apiUrl + 'getLastApplications').pipe(
      tap(data => console.log('Last 10 Applications: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getInterviews(): Observable<Interview[]> {
    return this.http.get<Interview[]>(this.interviewsUrl).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getJobDetails(): Observable<JobDetails[]> {
    return this.http.get<JobDetails[]>(this.apiUrl + 'getJobDetails').pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  addNewApplication(application: Application): Observable<Application> {
    return this.http.post<Application>(this.apiUrl + 'addNewApplication', application, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }
  addNewInterview(interview: Interview): Observable<Interview> {
    console.log(interview);
    return this.http.post<Interview>(this.apiUrl + 'addNewInterview', interview, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
    }
  getApplicantById(id : Number): Observable<Application> {
    return this.http.get<Application>(this.apiUrl+'getApplicantById/'+id).pipe(
      tap(data => console.log('Applicant Info : ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getAllInterviewsofApplicant(appId: Number, jobId: Number): Observable<ApplicantInterviewHistory[]> {
    return this.http.get<ApplicantInterviewHistory[]>(this.apiUrl+'getOverallFeedback/'+appId+'/'+jobId).pipe(
      tap(data => console.log('getAllInterviewsofApplicant: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getInterviewSummary(intId: Number): Observable<InterviewSummaryModel[]> {
    return this.http.get<InterviewSummaryModel[]>(this.apiUrl+'getInterviewSummary/'+intId).pipe(
      tap(data => console.log('getAllInterviewSummary: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}
