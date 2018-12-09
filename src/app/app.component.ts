import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //title = 'app';

  isAuthenticated = false;

  onValidate(validationValue: boolean) {
    this.isAuthenticated = validationValue;
  }

  tabToSelect = 'home';
  @Output() tabSelection = new EventEmitter<string>();

  onNavigate(tab: string){
   console.log('in OnNavigate' + tab);
    this.tabToSelect = tab;
    this.tabSelection.emit(this.tabToSelect);
  }
}
