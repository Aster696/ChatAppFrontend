import { Component, OnInit } from '@angular/core';
import { Popups } from 'src/Models/Popups';
import { UserModel } from 'src/Models/UserModel';
import { InfoSharingService } from 'src/Services/InfoSharing/info-sharing.service';
import { MessageServiceService } from 'src/Services/MessageService/message-service.service';
import { UserServiceService } from 'src/Services/UserService/user-service.service';

@Component({
  selector: 'app-user-list-ui',
  templateUrl: './user-list-ui.component.html',
  styleUrls: ['./user-list-ui.component.css']
})
export class UserListUiComponent implements OnInit {

  constructor(
    private userService: UserServiceService,
    private dataSharingService: InfoSharingService
  ) { }
  //current user
  public user = new UserModel();
  //users friends
  public friends: UserModel[];
  //popups messages
  public pop = new Popups();
  //search friend
  public searchFriend: string;

  ngOnInit(): void {
    this.displayUser();
    this.displayFriends();
  }

  //display current user
  displayUser(): void{
    try {
      this.userService
      .displayUserById(this.userService.getId())
      .subscribe(
        data => {
          this.user = data;
        },
        error => {
          console.log(error);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  //display user friends
  displayFriends(): void {
    try {
      this.userService
      .displayFriends(this.userService.getId())
      .subscribe(
        data => {
          this.friends = data;
        },
        error => {
          console.log(error);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  selectFriend(friendId: string): void{
    try {
      this.dataSharingService
      .changeId(friendId);
    } catch (error) {
      console.log(error);
    }
  }

}
