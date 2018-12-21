import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {Router} from '@angular/router';
import { CurrentMemberService } from "../../../../../shared/services/current-member.service";
import { Member } from "../../../../../shared/models/member.model";
import { UpdateMember } from "../../../../../shared/models/update-member.model";
import { Observable } from "rxjs";
import * as Images from "../../../../../assets/base64Images.json";
import { EditMemberService } from '../../../../../shared/services/edit-member.service';

@Component({
  selector: 'app-edit-member',
  templateUrl: './edit-member.component.html',
  styleUrls: ['./edit-member.component.css']
})
export class EditMemberComponent implements OnInit {

  public memberObservable: Observable<Member>;
  public sharedMember: Member;
  public sharedMemberCopy: Member;
  isSettled: boolean = true;
  memberImage: String;

  messageValue:String = "none";
  imageURL: String;

  @ViewChild('firstnameInput') firstNameInputRef: ElementRef;
  @ViewChild('lastnameInput') lastNameInputRef: ElementRef;
  @ViewChild('phoneInput') phoneInputRef: ElementRef;
  @ViewChild('emailInput') emailInputRef: ElementRef;
  @ViewChild('addressInput') addressInputRef: ElementRef;
  @ViewChild('cycleStartDateInput') cycleStartDateRef: ElementRef;
  @ViewChild('cycleEndDateInput') cycleEndDateRef: ElementRef;

  @ViewChild('message') messageRef: ElementRef;

  constructor(private _currentMemberService: CurrentMemberService, private _EditMemberService: EditMemberService, private _router: Router) { }

  ngOnInit() {
    this.memberObservable = this._currentMemberService.getCurrentMember();

    this.memberObservable.subscribe(val => {
      console.log(val._id);
      this.sharedMember = {...val};
      this.sharedMemberCopy = {...val};
    });

    if (this.sharedMember.memberImage) {

      if (this.sharedMember.memberImage != undefined) {
        this.memberImage = "data:image/png;base64," + this.sharedMember.memberImage;
      }

    } else {
      this.memberImage = "data:image/png;base64," + (<any>Images).memberAvatar;
    }

    let currDate = new Date();
    let fetchedDate = new Date(this.sharedMember.cycleEndDate);
    if (fetchedDate < currDate) {

      this.isSettled = false;
    }

    console.log("isSettled = ", this.isSettled);

    this.setMemberProfile(this.sharedMember);

  }

  setMemberProfile(sharedMemberObject: Member) {

    this.firstNameInputRef.nativeElement.value = sharedMemberObject.firstName;
    this.lastNameInputRef.nativeElement.value = sharedMemberObject.lastName;
    this.phoneInputRef.nativeElement.value = sharedMemberObject.phone;
    this.emailInputRef.nativeElement.value = sharedMemberObject.email;
    this.addressInputRef.nativeElement.value = sharedMemberObject.address;
    this.cycleStartDateRef.nativeElement.value = sharedMemberObject.cycleStartDate;
    this.cycleEndDateRef.nativeElement.value = sharedMemberObject.cycleEndDate;

  }

  saveMemberDetails() {

    console.log("this.getPostBody() : " + this.getPostBody());

    this._EditMemberService.updateMember(this.getPostBody()).subscribe((response) => {

      console.log(" subscribe Response = " + response.message);

      if (response.message === "Member updated successfully!!") {

        this._currentMemberService.setCurrentMember(this.sharedMemberCopy);
        this._router.navigate(['/member/profile/' + this.sharedMember._id], {queryParams :{updated: true}});
      } else {

        this.messageValue = "Error Updating Member Deatils";
        this.imageURL= "assets/bo_error.png";
        this.messageRef.nativeElement.style.display = '';
      }
      
    })


  }

  getPostBody() {

    var body = {
      "_id": this.sharedMember._id,
      "updateFields": this.detectChange(this.sharedMember)
    }

    return body;
  }

  detectChange(currMember: Member): any {

    let body = <UpdateMember>{};
    const first_name = this.firstNameInputRef.nativeElement.value;
    const last_name = this.lastNameInputRef.nativeElement.value;
    const phone = this.phoneInputRef.nativeElement.value;
    const email = this.emailInputRef.nativeElement.value;
    const address = this.addressInputRef.nativeElement.value;
    const cycle_startdate = this.cycleStartDateRef.nativeElement.value;
    const cycle_enddate = this.cycleEndDateRef.nativeElement.value;
    const member_image = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg==";

    if (currMember.firstName !== first_name) {

      body.firstName = first_name;
      this.sharedMemberCopy.firstName = first_name;   //updated currentMember for shared service

    }

    if (currMember.lastName !== last_name) {

      body.lastName = last_name;
      this.sharedMemberCopy.lastName = last_name; 

    }

    if (currMember.email !== email) {

      body.email = email;
      this.sharedMemberCopy.email = email; 

    }

    if (currMember.phone !== phone) {

      body.phone = phone.toString();
      this.sharedMemberCopy.phone = phone; 

    }

    if (currMember.address !== address) {

      body.address = address;
      this.sharedMemberCopy.address = address; 

    }

    if (currMember.cycleStartDate !== cycle_startdate) {

      body.cycleStartDate = cycle_startdate;
      this.sharedMemberCopy.cycleStartDate = cycle_startdate; 

    }

    if (currMember.cycleEndDate !== cycle_enddate) {

      body.cycleEndDate = cycle_enddate;
      this.sharedMemberCopy.cycleEndDate = cycle_enddate; 

    }

    return body;

  }

}
