import { Component } from '@angular/core';
import { MessageService } from 'src/app/services/message/message.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-matiere',
  templateUrl: './gestion-matiere.component.html',
  styleUrls: ['./gestion-matiere.component.css']
})
export class GestionMatiereComponent {

  matieres = [
    {
      id: 1,
      nom: "Math",
      description: "aze"
    },
    {
      id: 2,
      nom: "Svt",
      description: "aze"
    },
    {
      id: 3,
      nom: "Pc",
      description: "aze"
    },
  ];

  //ngModelAdd
  nomMatiereAdd: string = "";
  descriptionMatiereAdd: string = "";

  //ngModelUpdate
  nomMatiereUpdate: string = "";
  descriptionMatiereUpdate: string = "";

  //Pour Recuperer tout les matieres
  dbMatieres: any;

  //Pour Recuperer une matiere a traver son id
  currentMatiere: any;

  constructor(private messaService: MessageService) { }
  ngOnInit(): void {
    if (localStorage.getItem('matieres') == null || localStorage.getItem('matieres') == undefined) {
      localStorage.setItem('matieres', JSON.stringify(this.matieres));
    }

    this.dbMatieres = JSON.parse(localStorage.getItem('matieres') || "");
  }

  //ajoueter une matieres
  onAddMatiere() {
    if (this.nomMatiereAdd === "" || this.descriptionMatiereAdd === "") {
      this.messaService.showMessage("error", "Veuillez remplir tout les champs")
    } else {
      const newMatiere = {
        id: this.dbMatieres.length + 1,
        nom: this.nomMatiereAdd,
        description: this.descriptionMatiereAdd,
      }

      this.dbMatieres.push(newMatiere);
      localStorage.setItem('matieres', JSON.stringify(this.dbMatieres));
      this.messaService.showMessage("success", "Matière ajouter avec succées")

      this.nomMatiereAdd = "";
      this.descriptionMatiereAdd = "";
    }
  }

  //recuperer les info de la matiere selectionner et remplir les champs pour la modifification
  onCurrentMatiere(id: number) {
    this.currentMatiere = this.dbMatieres.find((elt: any) => elt.id === id);

    this.nomMatiereUpdate = this.currentMatiere.nom;
    this.descriptionMatiereUpdate = this.currentMatiere.description;
  }

  //modifier une matiere
  onUpdate() {
    if (this.nomMatiereUpdate === "" || this.descriptionMatiereUpdate === "") {
      this.messaService.showMessage("error", "Veuillez remplir tout les champs")
    } else {
      this.currentMatiere.nom = this.nomMatiereUpdate;
      this.currentMatiere.description = this.descriptionMatiereUpdate;

      localStorage.setItem('matieres', JSON.stringify(this.dbMatieres));
      this.messaService.showMessage("success", "Matière modifier avec succées")

    }
  }

  //supprimer une matiere
  onRemoveMatiere(id?: number) {
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
        const index = this.dbMatieres.findIndex((matiere: any) => matiere.id === id);

        if (index !== -1) {
          // Supprimer la matiere de la liste
          this.dbMatieres.splice(index, 1);

          // Mettre à jour le local storage
          localStorage.setItem('matieres', JSON.stringify(this.dbMatieres));

          this.messaService.showMessage('success', 'Matière supprimée avec succès');
        } else {
          this.messaService.showMessage('error', 'Matière non trouvée');
        }
        Swal.fire({
          title: "Supprimé!",
          text: "Matière supprimer avec succées.",
          icon: "success"
        });
      }
    });

  }
}
