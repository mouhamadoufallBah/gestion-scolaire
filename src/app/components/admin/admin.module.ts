import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { GestionClasseComponent } from './gestion-classe/gestion-classe.component';
import { GestionMatiereComponent } from './gestion-matiere/gestion-matiere.component';
import { GestionProfesseurComponent } from './gestion-professeur/gestion-professeur.component';
import { GestionApprenantComponent } from './gestion-apprenant/gestion-apprenant.component';
import { MainComponent } from './main/main.component';
import { AcceuilAdminComponent } from './acceuil-admin/acceuil-admin.component';
import { HeaderComponent } from './layouts/header/header.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClasseIdToClassnamePipe } from 'src/app/shared/pipes/classe/classe-id-to-classname.pipe';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    AdminComponent,
    GestionClasseComponent,
    GestionMatiereComponent,
    GestionProfesseurComponent,
    GestionApprenantComponent,
    MainComponent,
    AcceuilAdminComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    ProfileComponent,

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    SharedModule

  ]
})
export class AdminModule { }
