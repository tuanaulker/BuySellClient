import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  

  showPassword: boolean = false;
  model: any = {};


   constructor(
     private authService: AuthService,
     public router: Router,
     private activatedRoute: ActivatedRoute) {
   }

   ngOnInit(): void {
    if (localStorage.getItem("token")) {
      this.router.navigate(['']);
    }
   }

   login() {
    this.authService.login(this.model).subscribe(() => {
      const tokenT = localStorage.getItem("token");
      if (tokenT) {
        this.router.navigate([''], { relativeTo: this.activatedRoute });
      }
    },
      error => {
        console.log(error);
        alert("Hatalı giriş");
      })


   }
   showHidePassword() {
     this.showPassword = !this.showPassword;
   }
}
