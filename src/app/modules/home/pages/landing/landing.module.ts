import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { ContentComponent } from './content/content.component';
import { HomeComponent } from './pages/home/home.component';


@NgModule({
  declarations: [
    ContentComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    LandingRoutingModule
  ]
})
export class LandingModule { }
