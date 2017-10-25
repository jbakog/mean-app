import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SocketService {

  private url = 'http://localhost:3000';
  private socket = io(this.url);

  constructor() { }

  userJoin(userName) {
    this.socket.emit('user-join', {'username': userName});
    this.sendMessage('subscribe2po', userName);
    this.socket.on('new-user', (data: any) => {
      this.getMessages();
    });
  }

  sendMessage(message, data) {
    this.socket.emit(message, data);
  }

  getMessages() {
    console.log('inside getMessages()');
    const observable = new Observable(observer => {
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
