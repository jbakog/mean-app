import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions, ConnectionBackend } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { PostsService } from './services/posts/posts.service';
import { AuthService } from './services/auth/auth.service';
import { SocketService } from './services/socket/socket.service';

import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PdfCreatorService } from './services/pdfCreator/pdf-creator.service';
import { ConstantsService } from './services/constants/constants.service';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenGetter: (() => localStorage.getItem('access_token'))
  }), http, options);
}

// Define the routes
const ROUTES = [
  {
    path: '',
    redirectTo: 'po',
    pathMatch: 'full'
  },
  {
    path: 'po',
    component: PostsComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES) // Add routes to the app
  ],
  providers: [PostsService, PdfCreatorService, AuthService, ConstantsService, {
    provide: AuthHttp,
    useFactory: authHttpServiceFactory,
    deps: [Http, RequestOptions]
  }, SocketService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() { }
}
