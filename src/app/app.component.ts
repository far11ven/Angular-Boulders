import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //title = 'app';

  selectedTab = 'library';
  @Output() tabSelection = new EventEmitter<string>();

  onNavigate(tab: string){
   console.log('in OnNavigate' + tab);
    this.selectedTab = tab;
    this.tabSelection.emit(this.selectedTab);
  }
}
