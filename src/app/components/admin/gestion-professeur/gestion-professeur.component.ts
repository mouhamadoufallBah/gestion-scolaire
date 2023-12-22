import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message/message.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-professeur',
  templateUrl: './gestion-professeur.component.html',
  styleUrls: ['./gestion-professeur.component.css']
})
export class GestionProfesseurComponent implements OnInit {
  users: any;
  professeurs: any;
  // professeursDb: any;
  classesDb: any;
  matiereDb: any;

  currentProfesseur: any;

  //ngModelAdd
  prenomAdd: string = "";
  nomAdd: string = "";
  emailAdd: string = "";
  classeAdd:  number[] = [];
  matiereAdd: number[] = [];

  //ngModelAdd
  prenomUpdate: string = "";
  nomUpdate: string = "";
  emailUpdate: string = "";
  classeUpdate:  number[] = [];
  matiereUpdate: number[] = [];


  // {
  //   id: Math.floor(Math.random() * 10000),
  //   nom: "Prof3",
  //   prenom: "Prof3",
  //   email: "prof3@example.com",
  //   password: "prof123",
  //   role: "professeur",
  //   etat: "active",
  //   classesId: [1],
  //   matieres: [1]
  // }

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.users = JSON.parse(localStorage.getItem("users") || "");
    this.classesDb = JSON.parse(localStorage.getItem("classes") || "");
    this.matiereDb = JSON.parse(localStorage.getItem("matieres") || "");

    this.currentProfesseur = {
      id: null,
      nom: "",
      prenom: "",
      email: "",
      password: "",
      role: "",
      etat: "",
      classeId: [],
      matieres: [],
    }

    this.loadProfesseur();
  }

  loadProfesseur() {
    this.professeurs = this.users.filter((user: any) => user.role === 'professeur');
  }


  onAddProfesseur() {
    let newId = Math.floor(Math.random() * 10000)
    this.users.forEach((elt: any) => {
      if (elt.id == newId) {
        newId = Math.floor(Math.random() * 10000);
      }
    });

    if (this.prenomAdd === "" || this.nomAdd === "" || this.emailAdd == "" || this.classeAdd.length == 0 || this.matiereAdd.length == 0) {
      this.messageService.showMessage("error", "Veuillez remplir tout les champs")
    } else {
      const newApprenant = {
        id: newId,
        nom: this.nomAdd,
        prenom: this.prenomAdd,
        email: this.emailAdd,
        password: "passer123",
        role: "professeur",
        etat: "active",
        classeId: this.classeAdd,
        matieres: this.matiereAdd
      }

      this.users.push(newApprenant);
      // this.apprenantsDb.push(newApprenant);
      localStorage.setItem('users', JSON.stringify(this.users));
      // localStorage.setItem('apprenants', JSON.stringify(this.apprenantsDb));
      this.messageService.showMessage("success", "Professeur ajouter avec succées")

      this.nomAdd = "";
      this.prenomAdd = "";
      this.emailAdd = "";
      this.classeAdd = [];
      this.matiereAdd = [];

      this.loadProfesseur();
    }
  }

  onCurrentProffeseur(id: number) {
    this.currentProfesseur = this.users.find((elt: any) => elt.id === id);

    // console.log(this.currentProfesseur)

    this.nomUpdate = this.currentProfesseur.nom;
    this.prenomUpdate = this.currentProfesseur.prenom;
    this.emailUpdate = this.currentProfesseur.email;
    this.classeUpdate = this.currentProfesseur.classeId;
    this.matiereUpdate = this.currentProfesseur.matieres;
  }

  onUpdateProfesseur() {
    if (this.prenomUpdate === "" || this.nomUpdate === "" || this.emailUpdate == "" || this.classeUpdate.length == 0 || this.matiereUpdate.length == 0) {
      this.messageService.showMessage("error", "Veuillez remplir tout les champs")
    } else {
      this.currentProfesseur.nom = this.nomUpdate;
      this.currentProfesseur.prenom = this.prenomUpdate;
      this.currentProfesseur.email = this.emailUpdate;
      this.currentProfesseur.classesId = this.classeUpdate;
      this.currentProfesseur.matieres = this.matiereUpdate;

      localStorage.setItem('users', JSON.stringify(this.users));
      this.messageService.showMessage("success", "Professeur modifier avec succées")

      this.loadProfesseur();
    }
  }

  desactiveFormateur(id?: number) {
    this.currentProfesseur = this.users.find((elt: any) => elt.id === id)
    this.currentProfesseur.etat = this.currentProfesseur.etat === 'active' ? 'desactive' : 'active';
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  onDeleteProfesseur(id: number) {
    Swal.fire({
      title: "etes-vous sûr?",
      text: "de vouloir supprimer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Annuler",
      confirmButtonText: "Oui je veus supprimer"
    }).then((result) => {
      if (result.isConfirmed) {
        const index = this.users.findIndex((prof: any) => prof.id === id);

        if (index !== -1) {
          // Supprimer la classe de la liste
          this.users.splice(index, 1);
          // this.apprenantsDb.splice(index, 1);

          // Mettre à jour le local storage
          localStorage.setItem('users', JSON.stringify(this.users));
          // localStorage.setItem('apprenants', JSON.stringify(this.apprenantsDb));

          this.messageService.showMessage('success', 'Professeur supprimée avec succès');
        } else {
          this.messageService.showMessage('error', 'Professeur non trouvée');
        }
        Swal.fire({
          title: "Supprimé!",
          text: "Apprenant supprimer avec succées.",
          icon: "success"
        });
        this.loadProfesseur()
      }
    });
  }

}
