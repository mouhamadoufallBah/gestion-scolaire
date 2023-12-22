import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfesseurRoutingModule } from './professeur-routing.module';
import { ProfesseurComponent } from './professeur.component';
import { AcceuilProfesseurComponent } from './acceuil-professeur/acceuil-professeur.component';
import { GestionEvaluationComponent } from './gestion-evaluation/gestion-evaluation.component';
import { ProfileComponent } from './profile/profile.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './layouts/header/header.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ProfesseurComponent,
    AcceuilProfesseurComponent,
    GestionEvaluationComponent,
    ProfileComponent,
    MainComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    ProfesseurRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class ProfesseurModule { }
