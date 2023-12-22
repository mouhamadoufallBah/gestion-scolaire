import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message/message.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  userOnline: any;
  users: any;

  prenomUpdate: any;
  nomUpdate: any;
  emailUpdate: any;

  oldPassword: any;
  newPassword: any;
  reNewPassword: any;



  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.users = JSON.parse(localStorage.getItem('users') || "");
    const userOnlineId = JSON.parse(localStorage.getItem('currentUser') || "");

    this.userOnline = this.users.find((elt: any) => elt.id == userOnlineId)

    this.prenomUpdate = this.userOnline.prenom;
    this.nomUpdate = this.userOnline.nom;
    this.emailUpdate = this.userOnline.email;
  }


  onUpdateProfile() {
    if (this.prenomUpdate === "" || this.nomUpdate === "" || this.emailUpdate == "") {
      this.messageService.showMessage("error", "Veuillez remplir tout les champs");
    } else {
      this.userOnline.prenom = this.prenomUpdate;
      this.userOnline.nom = this.nomUpdate;
      this.userOnline.email = this.emailUpdate;

      localStorage.setItem('users', JSON.stringify(this.users));
      this.messageService.showMessage("success", "Information modifier avec succées");

    }
  }


  onUpdatePassword() {
    if (this.oldPassword === "" || this.newPassword === "" || this.reNewPassword == "") {
      this.messageService.showMessage("error", "Veuillez remplir tout les champs");
    } else {
      if (this.oldPassword != this.userOnline.password) {
        this.messageService.showMessage("error", "L'ancien mot de passe que vous avez saisie ne correspond pas à l'ancien mot de passe");
      } else {
        if (this.newPassword != this.reNewPassword) {
          this.messageService.showMessage("error", "Le nouveau mot de passe et la confirmation ne corresponde pas");
        }else{
          this.userOnline.password = this.reNewPassword;

          localStorage.setItem('users', JSON.stringify(this.users));
          this.messageService.showMessage("success", "Mot de passe modifier avec succées");

          this.oldPassword = ""
          this.newPassword = ""
          this.reNewPassword = ""
        }
      }
    }
  }

}
