import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { ContentComponent } from './content/content.component';
import { LoginComponent } from './pages/login/login.component';


@NgModule({
  declarations: [
    ContentComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
