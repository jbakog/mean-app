import { Component, OnInit, OnDestroy } from '@angular/core';
import { Headers } from '@angular/http';
import { PostsService } from '../services/posts/posts.service';
import { PdfCreatorService } from '../services/pdfCreator/pdf-creator.service';
import { ConstantsService } from '../services/constants/constants.service';
import { AuthService } from '../services/auth/auth.service';
import { AuthHttp } from 'angular2-jwt';
import * as _ from 'lodash';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { SocketService } from '../services/socket/socket.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, OnDestroy {

  // instantiate posts to an empty array
  po;
  pos: any = [];
  pdfJsonStruct;
  connection;
  constants;

  constructor(private postsService: PostsService, private authHttp: AuthHttp, private auth: AuthService,
              private pdfCreatorService: PdfCreatorService, private constantsService: ConstantsService,
              private socketService: SocketService) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

   }

  ngOnInit() {

    // authenticate 2 JWT
    this.auth.login('jbako');
    // send message to socket.io
    this.socketService.userJoin('jbako');

    // retrieve ALL posts from the API
    this.postsService.getAllPosts().subscribe(pos => {
      console.log('api: ' + pos);
      this.pos = pos;
    });

    // subscribe to changes RethinkDB
    this.connection = this.socketService.getMessages().subscribe(data => {
      console.log('socket: ' + data);
      if (data['type'] === 'remove') {
        console.log('remove');
        _.pull(this.pos, _.find(this.pos, data['pos']));
      } else {
        console.log('received data changeFeed: ' + this.socketService.socket.id);
        this.pos = _.unionBy([data['pos']], this.pos, 'id');
      }
    });
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }

  logId(id) {
    console.log(id);
  }

  pdf() {
    // Retrieve posts from the API
    let poData;
    this.postsService.getAllPosts().map( /// <<<=== use `map` here
    (response) => {
      const data = response.text() ? response.json() : [{}];
      if (data) {
        poData = data;
      }
      return JSON.stringify(poData);
    }
  );

  this.postsService.getAllPosts().subscribe(data => {
      this.pdfJsonStruct = this.pdfCreatorService.createPdfType1(data);
      pdfMake.createPdf(this.pdfJsonStruct).open();
   });
  }

  // Send Email Tests
  sendEmail() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/X-www-form-urlencoded');
    this.authHttp.post( this.constantsService.urlServer +
                        this.constantsService .urlEmail, this.constantsService.urlEmailTo, {headers: headers})
    .map(res => res.json())
    .subscribe(
      data =>  console.log(data),
      error => console.log(error)
    );
  }
}
