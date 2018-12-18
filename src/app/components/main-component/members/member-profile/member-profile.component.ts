import { Component, OnInit } from '@angular/core';
import {CurrentMemberService} from "../../../../../shared/services/current-member.service";
import {Member} from "../../../../../shared/models/member.model";
import { Observable } from "rxjs";  
import * as Images from "../../../../../assets/base64Images.json";

@Component({
  selector: 'app-member-profile',
  templateUrl: './member-profile.component.html',
  styleUrls: ['./member-profile.component.css']
})
export class MemberProfileComponent implements OnInit {

    public memberObservable: Observable<Member>;
    public sharedMember:Member;
    isSettled: boolean = true;
    memberImage : String;

    constructor(private _currentMemberService: CurrentMemberService){}

    ngOnInit() {
        this.memberObservable = this._currentMemberService.getCurrentMember();

        this.memberObservable.subscribe(val => {
           console.log(val._id);
           this.sharedMember = val;
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
    
    }

}
