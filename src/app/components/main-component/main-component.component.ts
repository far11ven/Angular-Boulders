import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-main-component',
  templateUrl: './main-component.component.html',
  styleUrls: ['./main-component.component.css']
})
export class MainComponentComponent implements OnInit {
  @Input() tabToDisplay:string = 'home';

  constructor() { }

  ngOnInit() {
  }

}
