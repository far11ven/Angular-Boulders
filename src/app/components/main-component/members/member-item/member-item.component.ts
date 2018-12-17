import { Component, OnInit, Input } from '@angular/core';
import {Member} from "../../../../../shared/models/member.model";
import * as Images from "../../../../../assets/base64Images.json";

@Component({
  selector: 'app-member-item',
  templateUrl: './member-item.component.html',
  styleUrls: ['./member-item.component.css']
})
export class MemberItemComponent implements OnInit {

  @Input() currMember: Member;
  memberImage : String;
  isSettled: boolean = true;

  constructor() {}

  ngOnInit() {

    if (this.currMember.memberImage != undefined) {
      this.memberImage = "data:image/png;base64," + this.currMember.memberImage;

    } else {
      this.memberImage = "data:image/png;base64," + (<any>Images).memberAvatar;
    }

    let currDate = new Date();
    var fetchedDate = new Date(this.currMember.cycleEndDate);
    console.log("isDue = ", fetchedDate < currDate);
    if (fetchedDate < currDate) {

      this.isSettled = false;
    }

  }


}
