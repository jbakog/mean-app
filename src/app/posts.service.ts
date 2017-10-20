import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
// socketio
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

import 'rxjs/add/operator/map';

@Injectable()
export class PostsService {

  private url = 'http://localhost:3000';
  private socket;

  constructor(private http: Http) { }

  // Get all posts from the API
  getAllPosts() {
    console.log('inside getAllPosts()');
    return this.http.get('/api/po')
    .map(res => res.json());
  }

  getMessages() {
    console.log('inside getMessages()');
    const observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('changeFeed', (data: any) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
}
