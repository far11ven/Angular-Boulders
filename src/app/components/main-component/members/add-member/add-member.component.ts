import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AddMemberService } from '../../../../../shared/services/add-member.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent implements OnInit {

  @ViewChild('firstnameInput') firstNameInputRef: ElementRef;
  @ViewChild('lastnameInput') lastNameInputRef: ElementRef;
  @ViewChild('phoneInput') phoneInputRef: ElementRef;
  @ViewChild('emailInput') emailInputRef: ElementRef;
  @ViewChild('addressInput') addressInputRef: ElementRef;
  @ViewChild('cycleStartDateInput') cycleStartDateRef: ElementRef;
  @ViewChild('cycleEndDateInput') cycleEndDateRef: ElementRef;

  @ViewChild('message') messageRef: ElementRef;
  

  constructor(private _AddMemberService: AddMemberService) { }

  ngOnInit() {


  }

  createMember() {

    this._AddMemberService.addMember(this.getPostBody()).subscribe((response) => {

      console.log(" subscribe Response = " + response.message);

      if(response.message === "New member created successfully!!"){

        this.messageRef.nativeElement.style.display = '';
        this.clearAll();
      }

    })
  }

  getPostBody(): any {

    var body = null;
    const first_name = this.firstNameInputRef.nativeElement.value;
    const last_name = this.lastNameInputRef.nativeElement.value;
    const phone = this.phoneInputRef.nativeElement.value;
    const email = this.emailInputRef.nativeElement.value;
    const address = this.addressInputRef.nativeElement.value;
    const cycle_startdate = this.cycleStartDateRef.nativeElement.value;
    const cycle_enddate = this.cycleEndDateRef.nativeElement.value;
    const parent = localStorage.getItem('_id');
    const linked_to = localStorage.getItem('orgName');
    const member_image =  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg==";

    body = {
      "first_name": first_name,
      "last_name": last_name,
      "phone": phone,
      "email": email,
      "address": address,
      "cycle_startdate": cycle_startdate,
      "cycle_enddate": cycle_enddate,
      "parent": parent,
      "linked_to": linked_to,
      "member_image": member_image
    };

    console.log('body == ', body);

    return body;


  }

  clearAll(){

    this.firstNameInputRef.nativeElement.value ='';
    this.lastNameInputRef.nativeElement.value ='';
    this.phoneInputRef.nativeElement.value ='';
    this.emailInputRef.nativeElement.value ='';
    this.addressInputRef.nativeElement.value ='';
    this.cycleStartDateRef.nativeElement.value=''; 
    this.cycleEndDateRef.nativeElement.value ='';


  }

}
