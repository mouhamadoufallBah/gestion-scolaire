import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AcceuilAdminComponent } from './acceuil-admin/acceuil-admin.component';
import { GestionApprenantComponent } from './gestion-apprenant/gestion-apprenant.component';
import { GestionClasseComponent } from './gestion-classe/gestion-classe.component';
import { GestionMatiereComponent } from './gestion-matiere/gestion-matiere.component';
import { GestionProfesseurComponent } from './gestion-professeur/gestion-professeur.component';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [{ path: '', component: MainComponent, children:[
  {path: 'acceuil-admin', component:AcceuilAdminComponent},
  {path: 'gestion-aprenant', component:GestionApprenantComponent},
  {path: 'gestion-classe', component:GestionClasseComponent},
  {path: 'gestion-matiere', component:GestionMatiereComponent},
  {path: 'gestion-professeur', component:GestionProfesseurComponent},
  {path: 'profile', component:ProfileComponent},
  { path: '', redirectTo: 'acceuil-admin', pathMatch: 'full' }
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
