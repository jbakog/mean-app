import { Component, OnInit, OnDestroy } from '@angular/core';
import { Headers } from '@angular/http';
import { PostsService } from '../posts.service';
import { PdfCreatorService } from '../pdfCreator/pdf-creator.service';
import { AuthService } from '../auth.service';
import { AuthHttp } from 'angular2-jwt';
import * as _ from 'lodash';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';


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

  constructor(private postsService: PostsService, private authHttp: AuthHttp, private auth: AuthService) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
   }

  ngOnInit() {
    // authenticate
    this.auth.login('');
    // Retrieve posts from the API
    this.postsService.getAllPosts().subscribe(pos => {
      console.log('api: ' + pos);
      this.pos = pos;
      this.postsService.sendMessage('subscribe2po', null);
    });

    // subscribe to socketio
    this.connection = this.postsService.getMessages().subscribe(data => {
      console.log('socket: ' + data);
      if (data['type'] === 'remove') {
        console.log('remove');
        _.pull(this.pos, _.find(this.pos, data['pos']));
      } else {
        this.pos = _.unionBy([data['pos']], this.pos, 'id');
      }
    });
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }

  logId(id) {
    console.log(id);
    this.postsService.sendMessage('me', id);
  }

  pdf() {
    // Retrieve posts from the API
    let poData;
    this.postsService.getAllPosts().map( /// <<<=== use `map` here
    (response) => {
      let data = response.text() ? response.json() : [{}];
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
  



    /*this.postsService.getAllPosts().subscribe(pos => {

      pdfMake.createPdf(this.pdfCreatorService.createPdfType1(pos)).open();
    }, () => {
      //this.pdfJsonStruct = this.pdfCreatorService.createPdfType1(pdfData);
      //pdfMake.createPdf(this.pdfJsonStruct).open();
    });*/

    
  }

  // Send Email Tests
  sendEmail() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/X-www-form-urlencoded');

    this.authHttp.post('http://localhost:3000/api/v1/sendmail', 'name=jbako@cosmo-one.gr', {headers: headers})
    .map(res => res.json())
    .subscribe(
      data =>  console.log(data),
      error => console.log(error)
    );
  }
}
