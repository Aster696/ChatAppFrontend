import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/Models/UserModel';
import { UserServiceService } from 'src/Services/UserService/user-service.service';

@Component({
  selector: 'app-friend-request-list',
  templateUrl: './friend-request-list.component.html',
  styleUrls: ['./friend-request-list.component.css']
})
export class FriendRequestListComponent implements OnInit {

  constructor(
    private changeDetect: ChangeDetectorRef,
    public userService: UserServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.displayFriendRequests();
  }

  public users: UserModel[];

  displayFriendRequests(): void{
    try {
      this.userService
      .displayFriendRequests(this.userService.getId())
      .subscribe(
        data => {
          this.users = data;
          this.changeDetect.detectChanges();
        }, error => {
          console.log(error);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  acceptFriendRequest(user: UserModel): void{
    try {
      this.userService
      .addFriend(this.userService.getId(), user)
      .subscribe(
        res => {
          console.log(res);
        }, error => {
          console.log(error);
          this.router.navigate(['/home']);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  removeFriendRequest(user: UserModel): void{
    try {
      this.userService
      .removeFriendRequest(this.userService.getId(), user)
      .subscribe(
        data => {
          console.log(data);
          this.router.navigate(['/home']);
        },error => {
          console.log(error);
          this.router.navigate(['/home']);
        }
      )
    } catch (error) {
      console.log(error);
    }
  }

  TrackBy(index: number, user: UserModel): any{
    return user._id;
  }

}
