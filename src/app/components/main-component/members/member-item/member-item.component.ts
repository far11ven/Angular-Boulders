import { Component, OnInit, Input, Output } from '@angular/core';
import {Member} from "../../../../../shared/models/member.model";
import {CurrentMemberService} from "../../../../../shared/services/current-member.service";
import {Router} from '@angular/router';

@Component({
  selector: 'app-member-item',
  templateUrl: './member-item.component.html',
  styleUrls: ['./member-item.component.css']
})
export class MemberItemComponent implements OnInit {

  @Input() tabName: String;
  @Input() currMember: Member;
  isSettled: boolean = true; 

  constructor(private _router: Router, private _currentMemberService: CurrentMemberService) {}

  ngOnInit() {

    let currDate = new Date();
    let fetchedDate = new Date(this.currMember.cycleEndDate);
    if (fetchedDate < currDate) {

      this.isSettled = false;
    }

    console.log("isSettled = ", this.isSettled);

  }

  openMemberProfile(currMemberObject: Member){
    this._currentMemberService.setCurrentMember(currMemberObject);
    this._router.navigate(['/member/profile/' + currMemberObject._id]);

  }


}
