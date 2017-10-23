import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
// socketio
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

import 'rxjs/add/operator/map';

@Injectable()
export class PdfCreatorService {

  //constructor() { }

  private url = 'http://localhost:3000';
  private socket;

  constructor(private http: Http) { }

  createPdfType1()
  {
    console.log('inside createPdfType1()');    
    return this.getAllPosts();
  }
  
  // Get all posts from the API
  getAllPosts() {
    return this.http.get('/api/po')
    .map(res => res.json());
  }

}
