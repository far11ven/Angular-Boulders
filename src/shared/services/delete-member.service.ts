import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders  } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";  

@Injectable({
  providedIn: 'root'
})
export class DeleteMemberService {
  postURL = 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/bouldersandroidapp-xitme/service/members/incoming_webhook/DELETE_Member_ById?secret=SECRET';
  _id: String;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  constructor(private _http: HttpClient) {}

  deleteMember(memberId: String): Observable<any> {

    let postBody = {"member_id": memberId};

    console.log("postBody : ", postBody);

    return this._http.post<any>(this.postURL, postBody, this.httpOptions);
}

}
