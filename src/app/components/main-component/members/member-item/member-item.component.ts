import { Component, OnInit, Input } from '@angular/core';
import {Member} from "../../../../../shared/models/member.model";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-member-item',
  templateUrl: './member-item.component.html',
  styleUrls: ['./member-item.component.css']
})
export class MemberItemComponent implements OnInit {

  @Input() currMember: Member;
  
  constructor(private _DomSanitizationService: DomSanitizer ) {}

  ngOnInit() {
    this.currMember.memberImage = "data:image/png;base64,"  + this.currMember.memberImage;

  }

}
