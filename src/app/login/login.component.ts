import { Component, OnInit, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../shared/services/user.service';
import { map } from 'rxjs/operators';
import CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userName : String;
  password: String;
  @Output() userAuthentication = new EventEmitter<boolean>();

  response: any;

  @ViewChild('usernameInput') usernameInputRef: ElementRef;
  @ViewChild('passwordInput') passwordInputRef: ElementRef;

  constructor(private _router: Router, private _UserService : UserService) {   }

  ngOnInit() {
  }

  validateUserAuthentication(){
    const username = this.usernameInputRef.nativeElement.value;
    const password = this.passwordInputRef.nativeElement.value;
    const passswordHash =  CryptoJS.SHA256(password);

    this._UserService.getUser(username).pipe(map((userdetails) => {
       this.password = userdetails.result[0].password;
       this.userName = userdetails.result[0].email;

       var orgName = userdetails.result[0].orgName;
       var email = userdetails.result[0].email;
       var db = userdetails.result[0].dbDetails;

      console.log(" email = " +  this.userName);
      localStorage.setItem('_id', userdetails.result[0]._id);
      localStorage.setItem('orgName', orgName);
      localStorage.setItem('_id', userdetails.result[0]._id);
      localStorage.setItem('email', email);
      localStorage.setItem('db', db);

      })).subscribe((response) =>{

      if(this.userName === username && this.password.toString() === passswordHash.toString()){
        this.userAuthentication.emit(true);
        this._router.navigate(['/home']);        }

    })

  }

  newRegistration(){
    this._router.navigate(['/register']); 
  }

}
