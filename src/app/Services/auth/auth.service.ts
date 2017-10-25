import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {

  constructor(private http: Http) {}

  login(credentials) {

    this.http.post('http://localhost:3000/authenticate', {username: 'test', password: 'test'})
      .map(res => res.json())
      .subscribe(
        // We're assuming the response will be an object
        // with the JWT on an id_token key
        data => localStorage.setItem('access_token', data.id_token),
        error => console.log(error)
      );
  }

  loggedIn() {
    return tokenNotExpired();
  }
}
