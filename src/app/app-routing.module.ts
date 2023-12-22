import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthentificationComponent } from './components/security/authentification/authentification.component';
import { AcceuilComponent } from './components/acceuil/acceuil.component';

const routes: Routes = [
  {path: 'authentification', component: AuthentificationComponent},
  {path: 'acceuil', component: AcceuilComponent},
  { path: 'admin-dashboard', loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule) },
  { path: 'professeur-dashboard', loadChildren: () => import('./components/professeur/professeur.module').then(m => m.ProfesseurModule) },
  { path: '',  redirectTo: 'authentification', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
