import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { authGuard } from '../shared/Guards/authGuards';


const routes: Routes = [
  { path: 'login', component: LoginComponent,pathMatch:'full' },
  { path: 'register', component: RegisterComponent,pathMatch:'full' },
  { path: 'user', component: UserComponent, data: { breadcrumb: 'User' },canActivate: [authGuard],pathMatch:'full'},
  {path:'user/change-password',component:ChangePasswordComponent,data: { breadcrumb: 'ChangePassword' },canActivate: [authGuard],pathMatch:'full'},
  
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class AccountRoutingModule { }
