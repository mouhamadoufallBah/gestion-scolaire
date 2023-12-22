import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApprenantRoutingModule } from './apprenant-routing.module';
import { ApprenantComponent } from './apprenant.component';
import { MainComponent } from './main/main.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ApprenantComponent,
    MainComponent,
    AcceuilComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ApprenantRoutingModule,
    FormsModule
  ]
})
export class ApprenantModule { }
