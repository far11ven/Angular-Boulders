import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {User} from "../models/user.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GetMemberService {
  _id:String;
  orgName :String;

  constructor(private http: HttpClient) {
    this._id= localStorage.getItem('_id');
    this.orgName =localStorage.getItem('orgName');
  }

  getAllMembers(userName : String){
    console.log('https://webhooks.mongodb-stitch.com/api/client/v2.0/app/bouldersandroidapp-xitme/service/members/incoming_webhook/GET_Members_ByUser_ByOrg?secret=SECRET&parent=' + this._id + '&org_name=' + this.orgName);
    return this.http.get<any>('https://webhooks.mongodb-stitch.com/api/client/v2.0/app/bouldersandroidapp-xitme/service/members/incoming_webhook/GET_Members_ByUser_ByOrg?secret=SECRET&parent=' + this._id + '&org_name=' + this.orgName);
  }

  getMemberById(memberId : String){
    return this.http.get<any>('https://webhooks.mongodb-stitch.com/api/client/v2.0/app/bouldersandroidapp-xitme/service/members/incoming_webhook/GET_Member_ById?secret=SECRET&member_id=' + memberId);
  }

  getMemberImage(member_id : String){
    return this.http.get<any>('https://webhooks.mongodb-stitch.com/api/client/v2.0/app/bouldersandroidapp-xitme/service/members/incoming_webhook/GET_MemberImage_ByParentId_ByMemberId?secret=SECRET&parent_id=' + this._id + '&member_id=' + member_id);
  }
}
