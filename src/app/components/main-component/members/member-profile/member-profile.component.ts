import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CurrentMemberService } from "../../../../../shared/services/current-member.service";
import { DeleteMemberService } from "../../../../../shared/services/delete-member.service";
import { Member } from "../../../../../shared/models/member.model";
import { Observable } from "rxjs";
import * as Images from "../../../../../assets/base64Images.json";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-profile',
  templateUrl: './member-profile.component.html',
  styleUrls: ['./member-profile.component.css']
})
export class MemberProfileComponent implements OnInit {

  public memberObservable: Observable<Member>;
  public sharedMember: Member;
  isSettled: boolean = true;
  memberImage: String;

  messageValue:String = "none";
  imageURL: String;

  @ViewChild('message') messageRef: ElementRef;

  constructor(private _currentMemberService: CurrentMemberService, private _DeleteMemberService: DeleteMemberService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {

    let isUpdated;

    this._route.queryParams.subscribe(params => {
      isUpdated = params['updated'];
      console.log("isUpdated flag ===:" + isUpdated);
    });

    if (isUpdated == 'true') {

      this.messageValue = "Member Saved Successfully!!";
      this.imageURL= "assets/bo_tick.png";

      this.messageRef.nativeElement.style.display = '';
    }

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

  editMember() {

    console.log("this.sharedMember :" + this.sharedMember._id);
    this._currentMemberService.setCurrentMember(this.sharedMember);
    this._router.navigate(['/member/edit-profile/' + this.sharedMember._id]);

  }

  deleteMember() {

    console.log("this.sharedMember :" + this.sharedMember._id);
    this._DeleteMemberService.deleteMember(this.sharedMember._id).subscribe((response) => {
      console.log(" subscribe Response = " + response.message);


      if (response.message === "Member removed successfully!!") {

        this._router.navigate(['/home'], {queryParams :{memberRemoved: true}});

      } else {

        this.messageValue = "Error Deleting Member!!";
        this.imageURL= "assets/bo_error.png";

        this.messageRef.nativeElement.style.display = '';
      }

    });
    

  }

}
