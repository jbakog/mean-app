import { Injectable } from '@angular/core';
import { ConstantsService } from '../constants/constants.service';

// socketio
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

import 'rxjs/add/operator/map';

import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class PostsService {

  // private url = 'http://localhost:3000';
  private socket;

  constructor(private authHttp: AuthHttp, private constantsService: ConstantsService) { }

  // Get all posts from the API
  getAllPosts() {
    console.log('inside getAllPosts()');
    return this.authHttp.get(this.constantsService.urlPos)
    .map(res => res.json());
  }

  getMessages() {
    console.log('inside getMessages()');
    const observable = new Observable(observer => {
      this.socket = io(this.constantsService.urlServer);
      this.socket.on('changeFeed', (data: any) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  sendMessage(ctx, message) {
    this.socket.emit(ctx, message);
  }

}
