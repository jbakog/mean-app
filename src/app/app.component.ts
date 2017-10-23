import { Component, LOCALE_ID, Inject } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  languages = [
    {code: 'en', label: 'English'},
    {code: 'el', label: 'Ελληνικά'}
  ];

  constructor(@Inject(LOCALE_ID) protected localedId: string) {}
}
