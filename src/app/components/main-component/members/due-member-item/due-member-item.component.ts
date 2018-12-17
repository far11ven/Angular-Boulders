import { Component, OnInit, Input } from '@angular/core';
import { Member } from "../../../../../shared/models/member.model";
import { DomSanitizer } from '@angular/platform-browser';
const CryptoJS = require('crypto-js');

@Component({
  selector: 'app-due-member-item',
  templateUrl: './due-member-item.component.html',
  styleUrls: ['./due-member-item.component.css']
})
export class DueMemberItemComponent implements OnInit {

  @Input() currMember: Member;
  isSettled: boolean = true;

  constructor(private _DomSanitizationService: DomSanitizer) { }

  ngOnInit() {
    if (this.currMember.memberImage != 'undefined') {
      this.currMember.memberImage = "data:image/png;base64," + this.currMember.memberImage;
    } else {

    }

    let currDate = new Date();
    var fetchedDate = new Date(this.currMember.cycleEndDate);
    console.log("isDue = ", fetchedDate < currDate);
    if (fetchedDate < currDate) {

      this.isSettled = false;
    }
  }

  encrypt() {

    const imgPath = require("../../../../../assets/ic_member.png");

    // PROCESS
    var imgSrcData = window.btoa(imgPath);
    const encrypted = CryptoJS.enc.Base64.stringify(imgSrcData);
    console.log()
    return encrypted;
  }

}
