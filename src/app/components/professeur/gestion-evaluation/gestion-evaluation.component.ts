import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message/message.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-evaluation',
  templateUrl: './gestion-evaluation.component.html',
  styleUrls: ['./gestion-evaluation.component.css']
})
export class GestionEvaluationComponent implements OnInit {

  evaluationDb: any;
  classesDb: any;
  matieresDb: any;
  evaluationByProf: any;

  users: any;
  userOnlineId: any;
  userOnline: any;
  currentEvaluation: any;
  apprenantByClasse: any;

  // ngModel add
  dateAdd: string = "";
  typeAdd: string = "";
  semetreAdd: string = "";
  classeAdd: string = "";
  matiereAdd: string = "";

    // ngModel update
    dateUpdate: string = "";
    typeUpdate: string = "";
    semetreUpdate: string = "";
    classeUpdate: string = "";
    matiereUpdate: string = "";

    // gModel add note
    noteApprenant!: number;

  evaluations = [
    {
      id: 1,
      date: "10/12/2023",
      type: "Evaluation",
      matiereId: 1,
      classeId: 2,
      professeurId: 2422,
      etat: "Fait",
      semestre: 1
    },
    {
      id: 2,
      date: "10/12/2023",
      type: "Evaluation",
      matiereId: 3,
      classeId: 2,
      professeurId: 2422,
      etat: "En cours",
      semestre: 1
    },
    {
      id: 3,
      date: "10/12/2023",
      type: "Evaluation",
      matiereId: 1,
      classeId: 3,
      professeurId: 2422,
      etat: "Reporté",
      semestre: 1
    },
  ];

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    if (localStorage.getItem('evaluations') == null || localStorage.getItem('evaluations') == undefined) {
      localStorage.setItem('evaluations', JSON.stringify(this.evaluations));

      this.currentEvaluation = {

          id: null,
          date: "",
          type: "",
          matiereId: null,
          classeId: null,
          professeurId: null,
          etat: "",
          semestre: null
      }
    }

    this.users = JSON.parse(localStorage.getItem('users') || "");
    this.userOnlineId = JSON.parse(localStorage.getItem('currentUser') || "");

    this.userOnline = this.users.find((elt: any) => elt.id == this.userOnlineId);

    // console.log(this.userOnline)

    this.evaluationDb = JSON.parse(localStorage.getItem('evaluations') || "");
    this.classesDb = JSON.parse(localStorage.getItem('classes') || "");
    this.matieresDb = JSON.parse(localStorage.getItem('matieres') || "");

    this.loadAllEvaluationByCurrentProf();
  }

  loadAllEvaluationByCurrentProf() {
    this.evaluationByProf = this.evaluationDb.filter((elt: any) => elt.professeurId === this.userOnlineId);
  }

  onCurrentEvaluation(id: number) {
    this.currentEvaluation = this.evaluationDb.find((elt: any) => elt.id === id);


    // console.log(this.currentEvaluation);

     // ngModel update
     this.dateUpdate = this.currentEvaluation.date;
     this.typeUpdate = this.currentEvaluation.type;
     this.semetreUpdate = this.currentEvaluation.semestre;
     this.classeUpdate = this.currentEvaluation.classeId;
     this.matiereUpdate = this.currentEvaluation.matiereId;
  }

  onChangeEtatEvaluation(id?: number) {
    const currentEv = this.evaluationDb.find((elt: any) => elt.id === id);
    currentEv.etat = currentEv.etat === 'En cours' ? 'Reporté' : 'En cours';
    localStorage.setItem('evaluations', JSON.stringify(this.evaluationDb));
  }

  onAddEvaluation() {

    if (this.dateAdd === "" || this.typeAdd === "" || this.semetreAdd == "" || this.classeAdd == "" || this.matiereAdd == "") {
      this.messageService.showMessage("error", "Veuillez remplir tout les champs")
    } else {
      const newEvaluation = {
        id: this.evaluationDb.length + 1,
        date: this.dateAdd,
        type: this.typeAdd,
        matiereId: this.matiereAdd,
        classeId: this.classeAdd,
        professeurId: this.userOnlineId,
        etat: "En cours",
        semestre: this.semetreAdd
      }

      this.evaluationDb.push(newEvaluation);
      localStorage.setItem('evaluations', JSON.stringify(this.evaluationDb));
      this.messageService.showMessage("success", "Evaluation ajouter avec succées")

      this.dateAdd = "";
      this.typeAdd = "";
      this.semetreAdd = "";
      this.classeAdd = "";
      this.matiereAdd = "";

      this.loadAllEvaluationByCurrentProf();
    }
  }

  onUpdateEvaluation() {
    if (this.dateUpdate == "" || this.typeUpdate == "" || this.semetreUpdate == "" || this.classeUpdate == "" || this.matiereUpdate == "") {
      this.messageService.showMessage("error", "Veuillez remplir tout les champs")
    } else {
      this.currentEvaluation.date = this.dateUpdate;
      this.currentEvaluation.type = this.typeUpdate;
      this.currentEvaluation.semestre = this.semetreUpdate;
      this.currentEvaluation.classeId = this.classeUpdate;
      this.currentEvaluation.matiereId = this.matiereUpdate;

      localStorage.setItem('evaluations', JSON.stringify(this.evaluationDb));
      this.messageService.showMessage("success", "Evaluation Modifier avec succées")

      this.loadAllEvaluationByCurrentProf();
    }
  }

  onDeleteEvaluation(id: number) {
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
        const index = this.evaluationDb.findIndex((elt: any) => elt.id === id);

        if (index !== -1) {
          // Supprimer la classe de la liste
          this.evaluationDb.splice(index, 1);
          // this.apprenantsDb.splice(index, 1);

          // Mettre à jour le local storage
          localStorage.setItem('evaluations', JSON.stringify(this.evaluationDb));
          // localStorage.setItem('apprenants', JSON.stringify(this.apprenantsDb));

          this.messageService.showMessage('success', 'Evaluation supprimée avec succès');
        } else {
          this.messageService.showMessage('error', 'Evaluation non trouvée');
        }
        Swal.fire({
          title: "Supprimé!",
          text: "Evalauation supprimer avec succées.",
          icon: "success"
        });
        this.loadAllEvaluationByCurrentProf()
      }
    });
  }

  onFindApprenantByClasse(id: number){
    const apprenant = this.users.filter((user: any) => user.role === 'apprenant');
    this.apprenantByClasse = apprenant.filter((elt: any) => elt.classeId == id);
    
    console.log(this.apprenantByClasse);
  }

  // onEvaluationDatePassed(id?: number){
  //   this.currentEvaluation = this.evaluationDb.find((elt: any) => elt.id === id);
  //   const dateActuelle = new Date().getFullYear();
  //   console.log(dateActuelle);
  //   if(this.currentEvaluation.date > dateActuelle && this.currentEvaluation.date != "Reporté"){
  //     this.currentEvaluation.etat = "Fait";
  //   }

  //   localStorage.setItem('evaluations', JSON.stringify(this.evaluationDb));

  // }



}

