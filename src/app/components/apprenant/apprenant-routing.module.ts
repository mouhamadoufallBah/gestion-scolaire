import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprenantComponent } from './apprenant.component';

const routes: Routes = [{ path: '', component: ApprenantComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApprenantRoutingModule { }
