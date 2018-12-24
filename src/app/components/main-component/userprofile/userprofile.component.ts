import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../../../../shared/services/user.service'
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { CurrentUserService } from '../../../../shared/services/current-user.service'

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  public currentUser : any = {};
  
  @ViewChild('firstnameInput') firstNameInputRef: ElementRef;
  @ViewChild('lastnameInput') lastNameInputRef: ElementRef;
  @ViewChild('orgName') orgNameRef: ElementRef;
  @ViewChild('emailInput') emailInputRef: ElementRef;
  @ViewChild('securityQuestion') securityQuestionRef: ElementRef;
  @ViewChild('securityAnswer') securityAnswerRef: ElementRef;

  constructor(private _UserService: UserService, private _CurrentUserService: CurrentUserService, private _router: Router) {

    this.setUpUserProfile(localStorage.getItem('email'));
    this.setUpUserSecurityProfile(localStorage.getItem('email'));
  }

  ngOnInit() { }

  setUpUserProfile(username: String) {

    this._UserService.getUser(username).pipe(map((userdetails) => {

      console.log(" userdetails.result[0].firstName" + userdetails.result[0].firstName);
      this.currentUser.firstName = userdetails.result[0].firstName;
      this.currentUser.lastName = userdetails.result[0].lastName;
      this.currentUser.orgName = userdetails.result[0].orgName;
      this.currentUser.email = userdetails.result[0].email;
      this.currentUser.createDate = userdetails.result[0].createDate;


    })).subscribe((response) => {

      
     })

  }

  setUpUserSecurityProfile(username: String) {

    this._UserService.getUserSecurity(username).subscribe((response) => {

      this.currentUser.securityQues = response.result.userSecurityQues;
      this.currentUser.securityValue = response.result.userSecurityValue;
    })

  }

  editUserDetails(){
    this._CurrentUserService.setCurrentUser(this.currentUser);
    this._router.navigate(['/profile/edit']);
  }


}
