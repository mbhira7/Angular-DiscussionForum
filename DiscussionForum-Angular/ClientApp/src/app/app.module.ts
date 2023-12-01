import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { QuestionsComponent } from "./questions/questions.component";
import { QuestionOverviewCardComponent } from "./shared/questionOverviewCard.component";
import { QuestionformComponent } from "./questions/questionform.component"
import { QuestiondetailComponent } from "./questions/questiondetail.component"
import { RegisterComponent } from "./authentication/register.component"
import { LoginComponent } from "./authentication/login.component"

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    QuestionsComponent,
    QuestionOverviewCardComponent,
    QuestionformComponent,
    QuestiondetailComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'questions', component: QuestionsComponent },
      { path: 'questions/:id', component: QuestiondetailComponent },
      { path: 'questionform', component: QuestionformComponent },
      { path: 'auth/register', component: RegisterComponent },
      { path: 'auth/login', component: LoginComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

