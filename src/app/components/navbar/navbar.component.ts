import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  showMenu: boolean = false;

  constructor(
    private router: Router){
      
    }

  hasUsername(): boolean {
    return localStorage.getItem('username') !== null;
  }

  getUsername(): string {
    return localStorage.getItem('username')!;
  }

 
  logOut(){
    localStorage.removeItem("token");
    localStorage.clear();
    // console.log("logout");
    this.router.navigate([""]);
   }
}
