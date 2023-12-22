import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/services/message/message.service';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent implements OnInit {

  emailInput = "";
  passwordInput = "";

  adminDb: any;
  professeursDb: any;
  apprenantsDb: any;

  users!: any[];

  findUser: any;


  admins = [
    {
      id: Math.floor(Math.random() * 10000),
      nom: "Admin",
      prenom: "Admin",
      email: "admin@example.com",
      password: "admin123",
      role: "administrateur",
      etat: "active"
    }
  ];

  professeurs = [
    {
      id: Math.floor(Math.random() * 10000),
      nom: "Prof",
      prenom: "Prof",
      email: "prof@example.com",
      password: "prof123",
      role: "professeur",
      etat: "active",
      classesId: [1],
      matieres: [1]
    },
    {
      id: Math.floor(Math.random() * 10000),
      nom: "Prof2",
      prenom: "Prof2",
      email: "prof2@example.com",
      password: "prof123",
      role: "professeur",
      etat: "active",
      classesId: [1],
      matieres: [1]
    },
    {
      id: Math.floor(Math.random() * 10000),
      nom: "Prof3",
      prenom: "Prof3",
      email: "prof3@example.com",
      password: "prof123",
      role: "professeur",
      etat: "active",
      classesId: [1],
      matieres: [1]
    },
  ];

  apprenants = [
    {
      id: Math.floor(Math.random() * 10000),
      nom: "Apprenant",
      prenom: "Apprenant",
      email: "apprenant@example.com",
      password: "apprenant123",
      role: "apprenant",
      etat: "active",
      classeId: 1,
      Notes: []
    },
    {
      id: Math.floor(Math.random() * 10000),
      nom: "Apprenant3",
      prenom: "Apprenant3",
      email: "apprenant3@example.com",
      password: "apprenant123",
      role: "apprenant",
      etat: "active",
      classeId: 2,
      Notes: []
    },
    {
      id: Math.floor(Math.random() * 10000),
      nom: "Apprenant3",
      prenom: "Apprenant3",
      email: "apprenant3@example.com",
      password: "apprenant123",
      role: "apprenant",
      etat: "active",
      classeId: 3,
      Notes: []
    },
  ];

  // classes = [
  //   {
  //     id: 1,
  //     nom: "Seconde S",
  //     apprenantId: [1]
  //   },
  //   {
  //     id: 2,
  //     nom: "Premiere S",
  //     apprenantId: [2]
  //   },
  //   {
  //     id: 3,
  //     nom: "Terminale S",
  //     apprenantId: [3]
  //   },
  // ];

  // matieres = [
  //   {
  //     id: 1,
  //     nom: "Math",
  //   },
  //   {
  //     id: 2,
  //     nom: "Svt",
  //   },
  //   {
  //     id: 3,
  //     nom: "Pc",
  //   },
  // ];

  // evaluation = [
  //   {
  //     id: 1,
  //     date: "10/12/2023",
  //     type: "Evaluation",
  //     matiereId: 1,
  //     classeId: 2
  //   },
  //   {
  //     id: 2,
  //     date: "10/12/2023",
  //     type: "Evaluation",
  //     matiereId: 3,
  //     classeId: 2
  //   },
  //   {
  //     id: 3,
  //     date: "10/12/2023",
  //     type: "Evaluation",
  //     matiereId: 1,
  //     classeId: 3
  //   },
  // ];

  constructor(private messageService: MessageService, private route: Router) { }
  ngOnInit(): void {
    if (localStorage.getItem('admins') == null || localStorage.getItem('admins') == undefined){
      localStorage.setItem('admins', JSON.stringify(this.admins));
    }
    if (localStorage.getItem('professeurs') == null || localStorage.getItem('professeurs') == undefined){
      localStorage.setItem('professeurs', JSON.stringify(this.professeurs));
    }
    if (localStorage.getItem('apprenants') == null || localStorage.getItem('apprenants') == undefined){
      localStorage.setItem('apprenants', JSON.stringify(this.apprenants));
    }

    this.users = []
    //recuperer notre local storage
    this.adminDb = JSON.parse(localStorage.getItem('admins') || "");
    this.professeursDb = JSON.parse(localStorage.getItem('professeurs') || "");
    this.apprenantsDb = JSON.parse(localStorage.getItem('apprenants') || "");

    // regrouper nos user dans un tableaux
    this.adminDb.forEach((element: any) => {
      this.users.push(element);
    });

    this.professeursDb.forEach((element: any) => {
      this.users.push(element);
    });
    this.apprenantsDb.forEach((element: any) => {
      this.users.push(element);
    });

    // enregistrer users dans le local storage pour la connexion

    if (localStorage.getItem('users') == null || localStorage.getItem('users') == undefined){
      localStorage.setItem('users', JSON.stringify(this.users));
    }
  }

  login() {
    // Si les champs sont vide on affiche une message d'erreur❌
    // Sinon on essaye de trouver le user correspondant✅
    if (this.emailInput == "" || this.passwordInput == "") {
      this.messageService.showMessage('error', 'Email ou mot de passe incorecte');
    } else {

      //On essaye de recuperer le user qui a le mail siasie
      this.findUser = this.users.find((element: any) => element.email == this.emailInput);
      //on verifie si notre variable à trouver un objet correspondant
      if (this.findUser) {
        //On verifie si le mot de passe est bon
        if (this.findUser.password == this.passwordInput && this.findUser.etat == "active") {
          if(this.findUser.role === "administrateur"){
            this.route.navigate(['/', 'admin-dashboard']);
            this.messageService.showMessage('success', 'Bienvenue Cher(e)'+ this.findUser.nom);
          }else if(this.findUser.role === "professeur"){
            this.route.navigate(['/', 'professeur-dashboard']);
            this.messageService.showMessage('success', 'Bienvenue Cher(e)'+ this.findUser.nom);
          }else{
            this.route.navigate(['/', 'apprenant-acceuil']);
            this.messageService.showMessage('success', 'Bienvenue Cher(e)'+ this.findUser.nom);
          }

          //enregistrer l'utilisateur connecter
          localStorage.setItem('currentUser', JSON.stringify(this.findUser.id));

          //vider les champs
          this.emailInput = "";
          this.passwordInput = "";
        } else {
          this.messageService.showMessage('error', 'Email ou mot de passe incorecte');
        }
      } else {
        this.messageService.showMessage('error', 'Email ou mot de passe incorecte');
      }
    }
  }

}
