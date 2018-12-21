import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {GetMemberService} from '../../../../shared/services/get-member.service';
import {Member} from "../../../../shared/models/member.model";

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

  constructor(private _router: Router, private _MemberService : GetMemberService, private _route: ActivatedRoute) {  }

  ngOnInit() {

     this.getAllMembers();
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

    this._MemberService.getAllMembers(username).subscribe((response) =>{

          console.log('response ==', response );
          var result : Member[];
          result = response.result;
    
          console.log(result[0]._id);
          console.log(result[1]._id);
    
          this.membersArray = result;

    })

  }

  addNewMember(){

    this._router.navigate(['/member/addmember']);
    
  }

}
