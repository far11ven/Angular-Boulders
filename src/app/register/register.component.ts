import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isForm1Validated:boolean = false;

  public securityQuestions: String[] = ['What was your high school name?',
  'Where were you born?',
  'Which football team do you support?',
  'What is your mother\'s maiden name?',
  'What is your secret superhero name?'];

  constructor() {

    console.log("Initializing REGISTER CONSTRUCTOR");
   }

  ngOnInit() {
    console.log("Initializing REGISTER cOMPONENT");
  }

  isRegisterForm1Validated(){

    return this.isForm1Validated;

  }

  validatedForm1(){

    this.isForm1Validated = true;

  }

}
