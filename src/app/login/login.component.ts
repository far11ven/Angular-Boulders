import { Component, OnInit, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {UserService} from '../../shared/services/user.service';
import { map } from 'rxjs/operators';
import CryptoJS from 'crypto-js';
import {User} from "../../shared/models/user.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userName : String;
  password: String;

  response: any;

  @ViewChild('usernameInput') usernameInputRef: ElementRef;
  @ViewChild('passwordInput') passwordInputRef: ElementRef;

  constructor(private router: Router, private http: HttpClient, private _UserService : UserService) { 

    console.log("Inside Constructor ==: " + localStorage.getItem('isAuthenticated'));
    
    if(localStorage.getItem('isAuthenticated') != 'true'){
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit() {

  }

  @Output() userAuthentication = new EventEmitter<boolean>();

  validateUserAuthentication(){
    const username = this.usernameInputRef.nativeElement.value;
    const password = this.passwordInputRef.nativeElement.value;
    const passswordHash =  CryptoJS.SHA256(password);

    this._UserService.getUser(username).pipe(map((userdetails) => {
       this.password = userdetails.result[0].password;
       this.userName = userdetails.result[0].email;
      })).subscribe((response) =>{

      this.response = response;
      console.log(" email = " +  this.userName);

      if(this.userName === username && this.password.toString() === passswordHash.toString()){
        this.userAuthentication.emit(true);
        this.router.navigate(['/home']);        }

    })

  }

}
