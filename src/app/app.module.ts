import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DashboardComponent } from 'src/dashboard/dashboard.component';
import { ApplicationComponent } from '../application/application.component';
import { InterviewsComponent } from '../interviews/interviews.component';
import { UserService } from '../services/user.service';
import { MatTableModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ApplicationComponent,
    InterviewsComponent
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '',
        component: DashboardComponent
      },
      {
         path: 'dashboard',
         component: DashboardComponent
      },
      {
        path: 'applications',
        component: ApplicationComponent
     },
     {
      path: 'interviews',
      component: InterviewsComponent
   },
   ])
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
