import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApprenantRoutingModule } from './apprenant-routing.module';
import { ApprenantComponent } from './apprenant.component';


@NgModule({
  declarations: [
    ApprenantComponent
  ],
  imports: [
    CommonModule,
    ApprenantRoutingModule
  ]
})
export class ApprenantModule { }
