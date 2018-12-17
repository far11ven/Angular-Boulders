import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  @Output() tabSelection = new EventEmitter<string>();

  onSelect(selectedTab:string){
    this.tabSelection.emit(selectedTab);

    if(selectedTab == 'logout'){

      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('_id');
      localStorage.removeItem('orgName');
    }
    console.log('in onSelect : ' + selectedTab);

  }

  constructor() { }

  ngOnInit() {
  }

}
