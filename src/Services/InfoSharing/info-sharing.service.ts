import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfoSharingService {

  constructor() { }

  public friendId = new BehaviorSubject<string>("");
  public currentId = this.friendId.asObservable();

  public changeId(newId: string): void{
    // console.log(newId);
    this.friendId.next(newId);
  }

}
