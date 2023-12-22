import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})
export class AcceuilComponent implements OnInit {
  users: any;
  apprenants: any;
  notes: any;


  evaluationDetails: any[] = [];
  ngOnInit(): void {
    this.users = JSON.parse(localStorage.getItem('users') || "");
    this.apprenants = this.users.filter((user: any) => user.role === 'apprenant');

    let userOnlineId = JSON.parse(localStorage.getItem('currentUser') || "");
    const currentApp = this.apprenants.find((elt: any) => elt.id == userOnlineId);
    this.notes = currentApp.Notes;

    const ev = JSON.parse(localStorage.getItem('evaluations') || "");

     // Bouclez sur les notes pour combiner les informations avec les détails de l'évaluation
     this.notes.forEach((note: any) => {
      const evaluationDetail = ev.find((elt: any) => elt.id == note.idEvaluation);

      // Ajoutez les détails de la note et de l'évaluation à votre tableau
      this.evaluationDetails.push({
        note: note,
        evaluation: evaluationDetail
      });
    });
    console.log(this.evaluationDetails)
  }



}


