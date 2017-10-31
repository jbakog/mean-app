import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import { ConstantsService } from '../constants/constants.service';

@Injectable()
export class AuthService {

  constructor(private http: Http, private constantsService: ConstantsService) {}

  login(credentials) {

    this.http.post(this.constantsService.urlServer + '/authenticate', {username: 'test', password: 'test'})
      .map(res => res.json())
      .subscribe(
        // We're assuming the response will be an object
        // with the JWT on an id_token key
        data => {localStorage.setItem('access_token', data.id_token); console.log('authenticated'); return true; },
        error => {console.log(error); return false; }
      );
  }

  loggedIn() {
    return tokenNotExpired();
  }
}
