import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfesseurComponent } from './professeur.component';
import { MainComponent } from './main/main.component';
import { AcceuilProfesseurComponent } from './acceuil-professeur/acceuil-professeur.component';
import { GestionEvaluationComponent } from './gestion-evaluation/gestion-evaluation.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [{
  path: '', component: MainComponent, children: [
    { path: 'acceuil-professeur', component: AcceuilProfesseurComponent },
    { path: 'gestion-evaluation', component: GestionEvaluationComponent },
    { path: 'profile', component: ProfileComponent },
    { path: '', redirectTo: 'acceuil-professeur', pathMatch: 'full' }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfesseurRoutingModule { }
