import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from "rxjs";  

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

    private currUser: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    public setCurrentUser(value: any):void {
        console.log("Setting in service == ");
        console.log(this.currUser);
        this.currUser.next(value);
    }

    public getCurrentUser():Observable<any> {

        return this.currUser;
    }
}
