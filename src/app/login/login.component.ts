import { Component, OnInit, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('usernameInput') usernameInputRef: ElementRef;
  @ViewChild('passwordInput') passwordInputRef: ElementRef;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  @Output() userAuthentication = new EventEmitter<boolean>();

  validateUserAuthentication(){
    const username = this.usernameInputRef.nativeElement.value;
    const password = this.passwordInputRef.nativeElement.value;

    console.log(username);
    console.log(password);

    if(username === "kb@c.com"){

    this.userAuthentication.emit(true);
    this.router.navigate(['/home']);
    }

  }

}
