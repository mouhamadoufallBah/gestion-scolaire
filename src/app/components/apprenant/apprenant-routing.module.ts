import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [{ path: '', component: MainComponent, children:[
  {path: 'acceuil-apprenant', component: AcceuilComponent},
  {path: 'profile', component: ProfileComponent},
  {path: '', redirectTo:'acceuil-apprenant', pathMatch: 'full'}
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApprenantRoutingModule { }
