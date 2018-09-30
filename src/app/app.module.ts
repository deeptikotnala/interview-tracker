import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApplicationComponent } from './application/application.component';
import { InterviewsComponent } from './interviews/interviews.component';
import { ApplicationService } from './services/application.service';
import { MatTableModule } from '@angular/material';
import { NewApplicationComponent } from 'src/app/application/new.application.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ApplicationComponent,
    InterviewsComponent,
    NewApplicationComponent
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'applications', component: ApplicationComponent},
      { path: 'interviews', component: InterviewsComponent },
      { path: 'new-application', component: NewApplicationComponent }
   ])
  ],
  providers: [ApplicationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
