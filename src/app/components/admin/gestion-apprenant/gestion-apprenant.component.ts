import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message/message.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-apprenant',
  templateUrl: './gestion-apprenant.component.html',
  styleUrls: ['./gestion-apprenant.component.css']
})
export class GestionApprenantComponent implements OnInit {

  users: any;
  apprenantsDb: any;
  classesDb: any;
  evaluationsDb: any;

  apprenants: any;

  currentAprenant: any;
  currentEvaluation: any;

  //ngModelAdd
  prenomAdd: string = "";
  nomAdd: string = "";
  emailAdd: string = "";
  classeAdd: string = "";

  //ngModelUpdate
  prenomUpdate: string = "";
  nomUpdate: string = "";
  emailUpdate: string = "";
  classeUpdate: string = "";

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.users = JSON.parse(localStorage.getItem("users") || "");
    this.apprenantsDb = JSON.parse(localStorage.getItem("apprenants") || "");
    this.classesDb = JSON.parse(localStorage.getItem("classes") || "");
    this.evaluationsDb = JSON.parse(localStorage.getItem("evaluations") || "");

    this.currentAprenant = {
      id: null,
      nom: "",
      prenom: "",
      email: "",
      password: "",
      role: "",
      etat: "",
      classeId: null,
      Notes: [],
    }

    this.currentEvaluation = {
      id: null,
      date: "",
      type: "",
      matiereId: null,
      classeId: null
    }

    this.loadApprenant();
  }

  loadApprenant() {
    this.apprenants = this.users.filter((user: any) => user.role === 'apprenant');
  }

  onAddAprenant() {
    let newId = Math.floor(Math.random() * 10000)
    this.users.forEach((elt: any) => {
      if (elt.id == newId) {
        newId = Math.floor(Math.random() * 10000);
      }
    });

    if (this.prenomAdd === "" || this.nomAdd === "" || this.emailAdd == "" || this.classeAdd == "") {
      this.messageService.showMessage("error", "Veuillez remplir tout les champs")
    } else {
      const newApprenant = {
        id: newId,
        nom: this.nomAdd,
        prenom: this.prenomAdd,
        email: this.emailAdd,
        password: "passer123",
        role: "apprenant",
        etat: "active",
        classeId: this.classeAdd,
        Notes: []
      }

      this.users.push(newApprenant);
      this.apprenantsDb.push(newApprenant);
      localStorage.setItem('users', JSON.stringify(this.users));
      localStorage.setItem('apprenants', JSON.stringify(this.apprenantsDb));
      this.messageService.showMessage("success", "Apprenant ajouter avec succées")

      this.nomAdd = "";
      this.prenomAdd = "";
      this.emailAdd = "";
      this.classeAdd = "";

      this.loadApprenant();
    }
  }

  onCurrentApprenant(id: number) {
    this.currentAprenant = this.users.find((elt: any) => elt.id === id);

    this.nomUpdate = this.currentAprenant.nom;
    this.prenomUpdate = this.currentAprenant.prenom;
    this.emailUpdate = this.currentAprenant.email;
    this.classeUpdate = this.currentAprenant.classeId;
  }

  onCurrentEv(id: number) {
    this.currentEvaluation = this.evaluationsDb.find((elt: any) => elt.id == id);
  }

  onUpdateAprenant() {
    if (this.prenomUpdate === "" || this.nomUpdate === "" || this.emailUpdate == "" || this.classeUpdate == "") {
      this.messageService.showMessage("error", "Veuillez remplir tout les champs")
    } else {
      this.currentAprenant.nom = this.nomUpdate;
      this.currentAprenant.prenom = this.prenomUpdate;
      this.currentAprenant.email = this.emailUpdate;
      this.currentAprenant.classeId = this.classeUpdate;

      localStorage.setItem('users', JSON.stringify(this.users));
      this.messageService.showMessage("success", "Apprenant ajouter avec succées")

      this.loadApprenant();
    }
  }

  desactiveApprenant(id?: number) {
    this.currentAprenant = this.users.find((elt: any) => elt.id === id)
    this.currentAprenant.etat = this.currentAprenant.etat === 'active' ? 'desactive' : 'active';
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  onDeleteApprenant(id: number) {
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
        const index = this.users.findIndex((apprenant: any) => apprenant.id === id);

        if (index !== -1) {
          // Supprimer la classe de la liste
          this.users.splice(index, 1);
          this.apprenantsDb.splice(index, 1);

          // Mettre à jour le local storage
          localStorage.setItem('users', JSON.stringify(this.users));
          localStorage.setItem('apprenants', JSON.stringify(this.apprenantsDb));

          this.messageService.showMessage('success', 'Apprenant supprimée avec succès');
        } else {
          this.messageService.showMessage('error', 'Apprenant non trouvée');
        }
        Swal.fire({
          title: "Supprimé!",
          text: "Apprenant supprimer avec succées.",
          icon: "success"
        });
        this.loadApprenant()
      }
    });
  }
}
