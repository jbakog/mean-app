import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { PostsService } from '../posts.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, OnDestroy {

  // instantiate posts to an empty array
  po;
  pos: any = [];
  connection;

  constructor(private postsService: PostsService, private http: Http) { }

  ngOnInit() {
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
    // TODO
  }
  // Send Email Tests
  sendEmail() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/X-www-form-urlencoded');

    this.http.post('http://localhost:3000/sendmail', 'name=jbako@cosmo-one.gr', {headers: headers}).subscribe((data) => {
      if (data.json().success) {
        console.log('Sent successfully');
      }
  });
  }
}
