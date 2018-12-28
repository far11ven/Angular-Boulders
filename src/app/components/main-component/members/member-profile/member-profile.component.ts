import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CurrentMemberService } from "../../../../../shared/services/current-member.service";
import { DeleteMemberService } from "../../../../../shared/services/delete-member.service";
import { Member } from "../../../../../shared/models/member.model";
import { GetMemberService } from '../../../../../shared/services/get-member.service';
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

  messageValue: String = "none";
  imageURL: String;

  @ViewChild('message') messageRef: ElementRef;

  constructor(private _currentMemberService: CurrentMemberService, private _MemberService: GetMemberService, private _DeleteMemberService: DeleteMemberService, private _router: Router, private _route: ActivatedRoute) { 

    this.memberObservable = this._currentMemberService.getCurrentMember();

    this.memberObservable.subscribe(val => {

      if (val) {
        console.log(val._id);
        this.sharedMember = val;
        console.log("iMAGE B4 SETTING ===:" + this.sharedMember.memberImage);
        this.detectIfSettled(this.sharedMember.cycleEndDate);
      } else {
        let params: any = this._route.snapshot.params;
        let member_id = params.id;
        console.log(member_id);
        this._MemberService.getMemberById(member_id).subscribe(response => {

          console.log(response);
          this.sharedMember = response.result[0];
          console.log("Fetched Image ===:" + this.sharedMember.memberImage);

          if (response.result[0].memberImage) {

            if (response.result[0].memberImage  != "" || response.result[0].memberImage  != undefined) {
              this.sharedMember.memberImage = "data:image/png;base64," + this.sharedMember.memberImage;
              console.log("Added Base 64 to URL");
            }
      
          } else {
            this.sharedMember.memberImage = "data:image/png;base64," + (<any>Images).memberAvatar;
          }
          
          this._currentMemberService.setCurrentMember(this.sharedMember);
          this.detectIfSettled(this.sharedMember.cycleEndDate);

        });


      }

    });
  }

  ngOnInit() {

    let isUpdated;


    this._route.queryParams.subscribe(params => {
      isUpdated = params['updated'];
      console.log("isUpdated flag ===:" + isUpdated);
    });

    if (isUpdated == 'true') {

      this.messageValue = "Member Saved Successfully!!";
      this.imageURL = "assets/bo_tick.png";

      this.messageRef.nativeElement.style.display = '';
    }

    
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

        this._router.navigate(['/home'], { queryParams: { memberRemoved: true } });

      } else {

        this.messageValue = "Error Deleting Member!!";
        this.imageURL = "assets/bo_error.png";

        this.messageRef.nativeElement.style.display = '';
      }

    });


  }

  detectIfSettled(date: String) {

    let currDate = new Date();
    let fetchedDate = new Date();
    if (fetchedDate < currDate) {

      this.isSettled = false;
    }

    console.log("isSettled = ", this.isSettled);
  }

}
