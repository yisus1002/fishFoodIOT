import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecordRoutingModule } from './record-routing.module';
import { ContentComponent } from './content/content.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { HomeComponent } from './pages/home/home.component';


@NgModule({
  declarations: [
    ContentComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    RecordRoutingModule,
    SharedModule
  ]
})
export class RecordModule { }
