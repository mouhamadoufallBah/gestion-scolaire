import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  users:any;
  userOnline:any;

  constructor(private route:Router){}

  ngOnInit(): void {
    this.users = JSON.parse(localStorage.getItem('users') || "");
    const userOnlineId = JSON.parse(localStorage.getItem('currentUser') || "");

    this.userOnline = this.users.find((elt: any) => elt.id == userOnlineId)
  }

  logout(){
    localStorage.removeItem('currentUser');
    this.route.navigate(['/authentification'])
  }

}
