import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { ConstantsService } from '../constants/constants.service';

@Injectable()
export class SocketService {

    public socket = io(this.constantsService.urlServer);

  constructor( private constantsService: ConstantsService) { }

  userJoin(userName) {
    this.socket.emit('user-join', {id : this.socket.id, username : userName});
    console.log('emit user-join: ' + this.socket.id);
    this.socket.emit('subscribe2po', {id : this.socket.id, username : userName});
    console.log('emit subscribe2po: ' + this.socket.id);
  }

  sendMessage(message, data) {
    this.socket.emit(message, data);
  }

  getMessages() {
    console.log('inside getMessages()');
    const observable = new Observable(observer => {
      this.socket.on('changeFeed', (data: any) => {
        console.log('received data changeFeed2');
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
}
