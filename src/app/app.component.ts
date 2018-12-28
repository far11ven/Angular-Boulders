import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //title = 'app';

  isAuthenticated = false;
  isNewRegisteration = false;
  tabToSelect = 'home';
  currentPath: String;
  @Output() tabSelection = new EventEmitter<string>();

  constructor(private _router: Router, private location: Location) {

    this.currentPath = location.path();

    console.log("Inside Constructor and route :");

    if (localStorage.getItem('isAuthenticated') != 'true') {

      if (this.currentPath !== '/register') {
        this._router.navigate(['/']);
      } else {

        this.isNewRegisteration = true;
      }

    } else {
      this._router.navigate(['/home']);

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

    if(this.currentPath.includes('/register')){
      this.isNewRegisteration = true;
    }
    console.log(localStorage.getItem('isAuthenticated'), this.isNewRegisteration);
    return localStorage.getItem('isAuthenticated');

  }
}
