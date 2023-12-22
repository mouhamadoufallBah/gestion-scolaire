import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acceuil-professeur',
  templateUrl: './acceuil-professeur.component.html',
  styleUrls: ['./acceuil-professeur.component.css']
})
export class AcceuilProfesseurComponent implements OnInit{


  users: any;
  professeurs:any;
  classesByProf:any;
  evaluationDb:any;
  evaluationByProf:any;
  evaluationOnGoing:any;
  evaluationOnGoingLength:any;
  evaluationReported:any;



  ngOnInit(): void {
    this.users = JSON.parse(localStorage.getItem('users') || "");
 
    this.professeurs = this.users.filter((user: any) => user.role === 'professeur');

    let userOnlineId = JSON.parse(localStorage.getItem('currentUser') || "");

    const currentProf = this.professeurs.find((elt: any) => elt.id ==userOnlineId)

    this.classesByProf = currentProf.classesId.length;

    this.evaluationDb = JSON.parse(localStorage.getItem('evaluations') || "");

    this.evaluationByProf = this.evaluationDb.filter((elt: any) => elt.professeurId === userOnlineId).length;
    this.evaluationOnGoing = this.evaluationDb.filter((elt: any) => elt.professeurId === userOnlineId).filter((elt:any) =>elt.etat == "En cours");
    this.evaluationOnGoingLength = this.evaluationDb.filter((elt: any) => elt.professeurId === userOnlineId).filter((elt:any) =>elt.etat == "En cours").length;
    this.evaluationReported = this.evaluationDb.filter((elt: any) => elt.professeurId === userOnlineId).filter((elt:any) =>elt.etat == "Reporté").length;
  }

}
