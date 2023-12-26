import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message/message.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-classe',
  templateUrl: './gestion-classe.component.html',
  styleUrls: ['./gestion-classe.component.css']
})
export class GestionClasseComponent implements OnInit {

  classes = [];

  //ngModelAdd
  nomClassAdd: string = "";
  annescolairClassAdd: string = "";

  //ngModelUpdate
  nomClassUpdate: string = "";
  annescolairClassUpdate: string = "";

  //Pour Recuperer tout les classe
  dbClasses: any;

  //Pour Recuperer une classe a traver son id
  currentClasse: any;

  constructor(private messaService: MessageService) { }
  ngOnInit(): void {
    if (localStorage.getItem('classes') == null || localStorage.getItem('classes') == undefined) {
      localStorage.setItem('classes', JSON.stringify(this.classes));
    }

    this.dbClasses = JSON.parse(localStorage.getItem('classes') || "");
  }

  //ajoueter une classe
  onAddClasse() {
    if (this.nomClassAdd === "" || this.annescolairClassAdd === "") {
      this.messaService.showMessage("error", "Veuillez remplir tout les champs")
    } else {
      const newClasse = {
        id: this.dbClasses.length + 1,
        nom: this.nomClassAdd,
        annescolaire: this.annescolairClassAdd,
        apprenantId: []
      }

      this.dbClasses.push(newClasse);
      localStorage.setItem('classes', JSON.stringify(this.dbClasses));
      this.messaService.showMessage("success", "Classe ajouter avec succées")

      this.nomClassAdd = "";
      this.annescolairClassAdd = "";
    }
  }

  //recuperer les info de la classe selectionner et remplir les champs pour la modifification
  onCurrentClasse(id: number) {
    this.currentClasse = this.dbClasses.find((elt: any) => elt.id === id);

    this.nomClassUpdate = this.currentClasse.nom;
    this.annescolairClassUpdate = this.currentClasse.annescolaire;
  }

  //modifier une classe
  onUpdate() {
    if (this.nomClassUpdate === "" || this.annescolairClassUpdate === "") {
      this.messaService.showMessage("error", "Veuillez remplir tout les champs")
    } else {
      this.currentClasse.nom = this.nomClassUpdate;
      this.currentClasse.annescolaire = this.annescolairClassUpdate;

      localStorage.setItem('classes', JSON.stringify(this.dbClasses));
      this.messaService.showMessage("success", "Classe modifier avec succées")

    }
  }

  //supprimer une classe
  onRemoveClasse(id?: number) {
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
        const index = this.dbClasses.findIndex((classe: any) => classe.id === id);

        if (index !== -1) {
          // Supprimer la classe de la liste
          this.dbClasses.splice(index, 1);

          // Mettre à jour le local storage
          localStorage.setItem('classes', JSON.stringify(this.dbClasses));

          this.messaService.showMessage('success', 'Classe supprimée avec succès');
        } else {
          this.messaService.showMessage('error', 'Classe non trouvée');
        }
        Swal.fire({
          title: "Supprimé!",
          text: "Classe supprimer avec succées.",
          icon: "success"
        });
      }
    });

  }


}
