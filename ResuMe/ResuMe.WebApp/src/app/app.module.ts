import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './components/user/register/register.component';
import { LoginComponent } from './components/user/login/login.component';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RecaptchaModule } from "ng-recaptcha";
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthInterceptor } from './guards/auth.interceptor';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { LanguagesComponent } from './components/languages/languages/languages.component';
import { AddLanguageComponent } from './components/languages/add-language/add-language.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import {TextFieldModule} from '@angular/cdk/text-field';

import { ClipboardModule } from '@angular/cdk/clipboard';

import { LanguagePipe } from './_pipes/language.pipe';
import { CareerPathComponent } from './components/career-path/career-path/career-path.component';
import { AddCareerPathComponent } from './components/career-path/add-career-path/add-career-path.component';
import { TechnologiesComponent } from './components/technology/technologies/technologies.component';
import { AddTechnologyComponent } from './components/technology/add-technology/add-technology.component';
import { LevelPipe } from './_pipes/level.pipe';
import { ToolsComponent } from './components/tools/tools/tools.component';
import { AddToolComponent } from './components/tools/add-tool/add-tool.component';
import { MethodologiesComponent } from './components/methodologies/methodologies/methodologies.component';
import { AddMethodologyComponent } from './components/methodologies/add-methodology/add-methodology.component';
import { CurriculumComponent } from './components/curriculum/curriculum.component';
import { AddProjectComponent } from './components/projects/add-project/add-project.component';
import { ProjectsComponent } from './components/projects/projects/projects.component';
import { AccountLayerComponent } from './components/account-layer/account-layer.component';
import { MatListModule } from '@angular/material/list';
import { ChangePasswordComponent } from './components/account-layer/change-password/change-password.component';
import { DeleteAccountComponent } from './components/account-layer/delete-account/delete-account.component';
import { AccountComponent } from './components/account-layer/account/account.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AddEducationComponent } from './components/education/add-education/add-education.component';
import { EducationComponent } from './components/education/education/education.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DatePipe } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { ProfileHeaderComponent } from './profile-header/profile-header.component';
import { NavComponent } from './components/nav/nav.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    UserProfileComponent,
    LanguagesComponent,
    AddLanguageComponent,
    LanguagePipe,
    CareerPathComponent,
    AddCareerPathComponent,
    TechnologiesComponent,
    AddTechnologyComponent,
    LevelPipe,
    ToolsComponent,
    AddToolComponent,
    MethodologiesComponent,
    AddMethodologyComponent,
    CurriculumComponent,
    AddProjectComponent,
    ProjectsComponent,
    AccountLayerComponent,
    ChangePasswordComponent,
    DeleteAccountComponent,
    AccountComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    AddEducationComponent,
    EducationComponent,
    NotFoundComponent,
    LoaderComponent,
    ProfileHeaderComponent,
    NavComponent
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES, { useHash:true }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    RecaptchaModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatRadioModule,
    MatMenuModule,
    MatTooltipModule,
    TextFieldModule,
    MatListModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
     ClipboardModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi:true
  },
  DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
