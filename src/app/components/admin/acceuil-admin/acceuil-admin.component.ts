import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acceuil-admin',
  templateUrl: './acceuil-admin.component.html',
  styleUrls: ['./acceuil-admin.component.css']
})
export class AcceuilAdminComponent implements OnInit{

  classes: any;
  users: any;
  apprenants:any;
  professeurs:any;


  evaluations = [];
  ngOnInit(): void {
    if (localStorage.getItem('evaluations') == null || localStorage.getItem('evaluations') == undefined){
      localStorage.setItem('evaluations', JSON.stringify(this.evaluations));
    }

    this.users = JSON.parse(localStorage.getItem('users') || "");
    this.classes = JSON.parse(localStorage.getItem('classes') || "");

    this.professeurs = this.users.filter((user: any) => user.role === 'professeur').reverse();
    this.apprenants = this.users.filter((user: any) => user.role === 'apprenant').reverse();
  }

}
