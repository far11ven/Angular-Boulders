import {Injectable} from "@angular/core";
import { map } from 'rxjs/operators';
import {User} from "../models/user.model";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(userName : String){
    return this.http.get<any>('https://webhooks.mongodb-stitch.com/api/client/v2.0/app/bouldersandroidapp-xitme/service/users/incoming_webhook/GET_User_ByEmail?secret=SECRET&email='+userName);
  }
}