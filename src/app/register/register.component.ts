import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() {

    console.log("Initializing REGISTER CONSTRUCTOR");
   }

  ngOnInit() {
    console.log("Initializing REGISTER cOMPONENT");
  }

}
