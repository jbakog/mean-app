import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostsService } from '../posts.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, OnDestroy {

  // instantiate posts to an empty array
  pos: any = [];
  connection;

  constructor(private postsService: PostsService) { }

  ngOnInit() {
    // Retrieve posts from the API
    this.postsService.getAllPosts().subscribe(pos => {
      console.log('api: ' + pos);
      this.pos = pos;
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
  }
}