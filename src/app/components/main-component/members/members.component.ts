import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {GetMemberService} from '../../../../shared/services/get-member.service';
import {Member} from "../../../../shared/models/member.model";
import * as Images from "../../../../assets/base64Images.json";

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  membersArray : Member[];
  @ViewChild('message') messageRef: ElementRef;

  messageValue:String = "none";
  imageURL: String;

  constructor(private _router: Router, private _MemberService : GetMemberService, private _route: ActivatedRoute) {  

    this.getAllMembers();
  }

  ngOnInit() {

     
  }

  getAllMembers() : any{

    let isMemberRemoved;

    this._route.queryParams.subscribe(params => {
      isMemberRemoved = params['memberRemoved'];
      console.log("isUpdated flag ===:" + isMemberRemoved);
    });

    if (isMemberRemoved == 'true') {
      this.messageValue = "Member removed Successfully!!";
      this.imageURL ="assets/bo_tick.png";
      this.messageRef.nativeElement.style.display = '';
    }
    const username =  localStorage.getItem('loggedInUser');
    const _id =  localStorage.getItem('_id');

    this._MemberService.getAllMembers(username).subscribe((response) =>{

          console.log('response ==', response );
          var result : Member[];
          result = response.result;
    
          console.log(result[0]._id);
          console.log(result[1]._id);
    
          this.membersArray = result;

          //fetchIamge

          this.membersArray.forEach((item, index) =>{
            console.log('Retrieving MemberImage ==' + item._id);

            this._MemberService.getMemberImage(item._id).subscribe((response) =>{
              
              if (response.result) {

                console.log('Inside Image ==', this.membersArray[index].memberImage  != undefined);

                if (response.result  != undefined) {
                  this.membersArray[index].memberImage = "data:image/png;base64," + response.result;
                  console.log("Added Base 64 to URL");
                }
          
              } else {
                this.membersArray[index].memberImage = "data:image/png;base64," + (<any>Images).memberAvatar;
              }

            });
        });
          

    })

  }

  addNewMember(){

    this._router.navigate(['/member/addmember']);
    
  }

}
