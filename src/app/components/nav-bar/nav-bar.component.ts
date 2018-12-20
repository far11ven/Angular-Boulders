import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  @Output() tabSelection = new EventEmitter<string>();
  activeRouteTitle: String;
  currentURL: String;

  constructor( private _router: Router) { }

  ngOnInit() {

    this.currentURL = this._router.url;

    this.activeRouteTitle = this.getRouteTitle(this.currentURL);
  }

  onSelect(selectedTab: string) {
    this.tabSelection.emit(selectedTab);

    if (selectedTab === 'logout') {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('_id');
      localStorage.removeItem('orgName');
    }
    console.log('in onSelect : ' + selectedTab);

  }

  getRouteTitle(currentURL: String): String {

    if (currentURL.includes('')) {

      this.activeRouteTitle = 'Add New Member';
      console.log(this.activeRouteTitle);
      return this.activeRouteTitle;

    } else if (currentURL.includes('')) {

    }


  }
}
