import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string="http://localhost:5201/identity/Users"
   jwtHelper= new JwtHelperService();
   decodedToken:any;
  constructor(private http:HttpClient) { }

  login(model:any) {
    return this.http.post(this.baseUrl +'/LoginUser', model).pipe(
      map((response:any) =>{
       const result=response;
        if (result){
          localStorage.setItem("token",result.data.accessToken),
          this.decodedToken = this.jwtHelper.decodeToken(result.data.accessToken);
          localStorage.setItem("username", this.decodedToken.UserName);
          localStorage.setItem("email", this.decodedToken.Email);
          localStorage.setItem("userId", this.decodedToken.UserId);
        }
      })
    )
  }

  loggedIn(){
    const token:any =localStorage.getItem("token");
    return !this.jwtHelper.isTokenExpired(token);
  }

  register(model:any) {
    debugger;
    localStorage.setItem("isSuccessful", "false");
    return this.http.post(this.baseUrl+'/CreateUser', model).pipe(
      map((response:any) =>{
       const result=response;
      if (result){
        localStorage.setItem("isSuccessful", result.isSuccessful);
        // model1.username = model.username;
        // model1.password = model.password;
        // this.login(model1);
        this.login({"userNameOrEmail": model.username, "password": model.password});
      }
      }))
    }

  // reg(){
  //   const token:any =localStorage.getItem("token");
  //   return !this.jwtHelper.isTokenExpired(token);
  // }
}
