import {Injectable} from "@angular/core";
import { map } from 'rxjs/operators';
import {User} from "../models/user.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";  

@Injectable()
export class UserService {

  updateSecurityURL ="https://webhooks.mongodb-stitch.com/api/client/v2.0/app/bouldersandroidapp-xitme/service/user_security/incoming_webhook/EDIT_UserSecurityByEmail";
  updateURL = "https://webhooks.mongodb-stitch.com/api/client/v2.0/app/bouldersandroidapp-xitme/service/users/incoming_webhook/EDIT_User_ById";
  updatePasswordURL :"https://webhooks.mongodb-stitch.com/api/client/v2.0/app/bouldersandroidapp-xitme/service/users/incoming_webhook/EDIT_ChangePasswordByEmail";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };
  constructor(private _http: HttpClient) {}

  getUser(userName : String){
    return this._http.get<any>('https://webhooks.mongodb-stitch.com/api/client/v2.0/app/bouldersandroidapp-xitme/service/users/incoming_webhook/GET_User_ByEmail?secret=SECRET&email='+userName);
  }

  getUserSecurity(userName : String){
    return this._http.get<any>('https://webhooks.mongodb-stitch.com/api/client/v2.0/app/bouldersandroidapp-xitme/service/user_security/incoming_webhook/GET_UserSecurityByEmail?secret=SECRET&email='+userName);
  }

  updateUserDetails(postBody: any): Observable<any> {

    console.log("postBody : ", postBody);

    return this._http.post<any>(this.updateURL, postBody, this.httpOptions);
  }

  updateUserPassword(postBody: any): Observable<any> {

    console.log("postBody : ", postBody);

    return this._http.post<any>(this.updatePasswordURL, postBody, this.httpOptions);
  }

  updateUserSecurityDetails(postBody: any): Observable<any> {

    console.log("postBody : ", postBody);

    return this._http.post<any>(this.updatePasswordURL, postBody, this.httpOptions);
  }
}