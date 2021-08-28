import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

const AUTH_API = 'http://localhost:8080/auth/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private logged = false;
  private connection: any;
  userName = ""

  constructor(
    private http: HttpClient,
    private router: Router) {
  }

  login(username: string, password: string): Observable<any> {
    this.userName = username;
    this.connection = this.http.post<any>(AUTH_API, {
      "login": username,
      "password": password
    }, httpOptions);
    return this.connection
  }

  onLogged(): void {
    this.logged = true;
    console.log("Websocket is Open!")
  }

  isLogged(): boolean {
    return this.logged;
  }

  logOut(): void{
    this.logged = false;
    this.connection.disconnect;
    this.router.navigateByUrl('/')
    console.log("Connection is Closed!")
  }

  getUserName():string{
    return this.userName;
  }
}
