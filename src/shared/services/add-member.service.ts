import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders  } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";  

@Injectable({
  providedIn: 'root'
})
export class AddMemberService {
  postURL = 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/bouldersandroidapp-xitme/service/members/incoming_webhook/POST_AddNewMember?secret=SECRET';
  _id: String;
  orgName: String;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  constructor(private _http: HttpClient) {
    this._id = localStorage.getItem('_id');
    this.orgName = localStorage.getItem('orgName');
  }

  addMember(postBody: any): Observable<any> {

    console.log("postBody : ", postBody);

    return this._http.post<any>(this.postURL, postBody, this.httpOptions);
}

}
