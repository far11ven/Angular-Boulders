import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {MemberService} from '../../../../shared/services/member.service';
import { map } from 'rxjs/operators';
import {Member} from "../../../../shared/models/member.model";

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  membersArray : Member[];

  constructor(private _router: Router, private http: HttpClient, private _MemberService : MemberService) {  }

  ngOnInit() {

     this.getAllMembers();
  }

  getAllMembers() : any{
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
