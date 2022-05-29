import { Routes } from '@angular/router';

import { RegisterComponent } from './components/user/register/register.component';
import { LoginComponent } from './components/user/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { CurriculumComponent } from './components/curriculum/curriculum.component';
import {  AccountLayerComponent } from './components/account-layer/account-layer.component';
import { DeleteAccountComponent } from './components/account-layer/delete-account/delete-account.component';
import { ChangePasswordComponent } from './components/account-layer/change-password/change-password.component';
import { AccountComponent } from './components/account-layer/account/account.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const ROUTES: Routes = [
   
    { path:'404', component: NotFoundComponent },
    { path:'register', component: RegisterComponent },
    { path:'login/:username', component: LoginComponent },
    { path:'login', component: LoginComponent },
    { path:'forgot-password', component: ForgotPasswordComponent },
    { path:'forgot-password/:emailOrName', component: ForgotPasswordComponent },
    { path:'reset-password/:token/:email', component: ResetPasswordComponent },

    { path:':username', component: UserProfileComponent, children:[
        { path:'', component: CurriculumComponent },
        { path:'account', component: AccountLayerComponent,  canActivate:[AuthGuard],children:[
            { path:'settings', component: AccountComponent },
            { path:'change-password', component: ChangePasswordComponent },
            { path:'delete-account', component: DeleteAccountComponent }
        ]}
    ]},
    { path:'', component: UserProfileComponent,  canActivate:[AuthGuard], children:[
        { path:'', component: CurriculumComponent },
    ]},   
    { path:'', redirectTo: 'login', pathMatch:"full" }

];