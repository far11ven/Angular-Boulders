import { Component, Input, Output, EventEmitter } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //title = 'app';

  isAuthenticated = false;
  tabToSelect = 'home';
  @Output() tabSelection = new EventEmitter<string>();
  constructor(private router: Router) {
    console.log('Inside Constructor == : ' + localStorage.getItem('isAuthenticated') === 'true');

    if (localStorage.getItem('isAuthenticated') === 'true') {
    }
  }

  onValidate(validationValue: boolean) {
    this.isAuthenticated = validationValue;
    localStorage.setItem('isAuthenticated', this.isAuthenticated ? 'true' : 'false');
    console.log(localStorage.getItem('isAuthenticated'));
  }

  onNavigate(tab: string) {
    console.log('in OnNavigate' + tab);
    this.tabToSelect = tab;
    this.tabSelection.emit(this.tabToSelect);
  }

  getAuthenticationFlag() {
    console.log(localStorage.getItem('isAuthenticated'));
    return localStorage.getItem('isAuthenticated');

 }
}
