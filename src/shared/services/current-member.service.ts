import { Injectable } from '@angular/core';
import {Member} from "../models/member.model";
import { Observable, BehaviorSubject } from "rxjs";  

@Injectable({
  providedIn: 'root'
})
export class CurrentMemberService {

  private currMember: BehaviorSubject<Member> = new BehaviorSubject<Member>(null);

    public setCurrentMember(value: Member):void {
      console.log("Setting in service == " + value.firstName);
        this.currMember.next(value);
    }

    public getCurrentMember():Observable<Member> {

        return this.currMember;
    }
}
