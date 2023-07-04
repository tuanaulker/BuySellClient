import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  showPassword: boolean = false;
  model: any = {}
  lowercaseLetter: boolean = false;
  capitalLetter: boolean = false;
  digit: boolean = false;
  passwordlength: number = 0;
  successful: boolean = false;
  allLowercaseLetters: string = "abcdefghijklmnopqrstuvwxyz";
  allCapitalLetters: string = "ABCDEFGHIKLMNOPQRSTVXYZ";
  numbers: string = "0987654321";


  constructor(
    private authService: AuthService,
    public router: Router) { }

  filterPassword(event: Event) {
    var filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    let fpassword = filterValue.charAt(filterValue.length - 1);
    if (fpassword != "") {
      if (this.passwordlength > filterValue.length) {
        this.lowercaseLetter = false;
        this.capitalLetter = false;
        this.digit = false;

        for (let i = 0; i < filterValue.length; i++) {

          if (this.allLowercaseLetters.includes(filterValue.charAt(i))) {
            this.lowercaseLetter = true;
          }
          else if (this.allCapitalLetters.includes(filterValue.charAt(i))) {
            this.capitalLetter = true;
          }
          else if (this.numbers.includes(filterValue.charAt(i))) {
            this.digit = true;
          }
        }
        this.passwordlength = filterValue.length;
        return;
      }

      if (this.allLowercaseLetters.includes(fpassword)) {
        this.lowercaseLetter = true;
      }
      else if (this.allCapitalLetters.includes(fpassword)) {
        this.capitalLetter = true;
      }
      else if (this.numbers.includes(fpassword)) {
        this.digit = true;
      }

      this.passwordlength = filterValue.length;
    }
  }

  register() {
    if (!this.lowercaseLetter) {
      alert("Password must contain lowercase letter.")
      return;
    }
    if (!this.capitalLetter) {
      alert("Password must contain uppercase letter.")
      return;
    }
    if (!this.digit) {
      alert("Password must contain digit.")
      return;
    }

    if (this.model.password.length < 8) {
      alert("Password length must be at least 8.")
      return;
    }

    this.authService.register(this.model).subscribe(() => {
      if (localStorage.getItem("isSuccessful") === "true") {
        alert("Login successfull!")
      }
      else if (localStorage.getItem("isSuccessful") === "false") {
        alert("Try again!")
      }
    }, error => {
      console.log(error);
      alert("Try Again!")
    });

  }

  showHidePassword() {
    this.showPassword = !this.showPassword;
  }

  successfule() {
    return this.successful;
  }

}
