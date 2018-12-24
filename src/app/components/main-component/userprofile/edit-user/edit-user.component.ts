import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { CurrentUserService } from '../../../../../shared/services/current-user.service'
import { UserService } from '../../../../../shared/services/user.service'
import { Observable } from "rxjs";
import CryptoJS from 'crypto-js';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  public currentUserDetails: Observable<any>;
  public postBodyUserDetails: any ={};
  public postBodyUserSecurityDetails: any ={};

  public securityQuestions: String[] = ['What was your high school name?',
    'Where were you born?',
    'Which football team do you support?',
    'What is your mother\'s maiden name?',
    'What is your secret superhero name?'];

    
  @ViewChild('userFirstnameInput') userFirstnameInputRef: ElementRef;
  @ViewChild('userLastnameInput') userLastnameInputRef: ElementRef;
  @ViewChild('userSequrityQuestionInput') userSequrityQuestionInputRef: ElementRef;
  @ViewChild('userSequrityAnswerInput') userSequrityAnswerInputRef: ElementRef;

  constructor(private _CurrentUserService: CurrentUserService , private _UserService : UserService) { 

    this._CurrentUserService.getCurrentUser().subscribe((response) => {
      console.log("Getting User Details :");
      console.log(response);

      this.currentUserDetails = response;

    });
  }

  ngOnInit() {}

  saveUserDetails(){

    var first_name = this.userFirstnameInputRef.nativeElement.value;
    var last_name = this.userLastnameInputRef.nativeElement.value;
    var security_ques = this.userSequrityQuestionInputRef.nativeElement.value;
    var security_answer = this.userSequrityAnswerInputRef.nativeElement.value;

    security_answer =  CryptoJS.SHA256(security_answer);

    if(first_name !== this.currentUserDetails['securityQues'] ||  last_name !== this.currentUserDetails['securityValue'] ){

      console.log("Inside fit=srts 1f");
      if(first_name !== this.currentUserDetails['securityQues']){

        this.postBodyUserDetails.first_name = first_name;
      }

      if(last_name !== this.currentUserDetails['securityValue'] ){

        this.postBodyUserDetails.last_name = last_name;
        
      }

      this._UserService.updateUserDetails(this.postBodyUserDetails).subscribe((response) => {

        console.log(response);

      });


    }

    if(security_ques !== this.currentUserDetails['firstName'] ||  security_answer !== this.currentUserDetails['lastName'] ){

      console.log("Inside fit=srts2nd 1f");

      if(security_ques !== this.currentUserDetails['firstName']){

        this.postBodyUserSecurityDetails.security_ques = security_ques;
      }

      if(security_answer !== this.currentUserDetails['lastName'] ){

        this.postBodyUserSecurityDetails.security_answer = security_answer;
        
      }

      this._UserService.updateUserSecurityDetails(this.postBodyUserSecurityDetails).subscribe((response) => {

        console.log(response);

      });
    }
  }

  

}
