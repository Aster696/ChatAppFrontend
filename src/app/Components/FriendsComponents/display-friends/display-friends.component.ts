import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Popups } from 'src/Models/Popups';
import { UserModel } from 'src/Models/UserModel';
import { UserServiceService } from 'src/Services/UserService/user-service.service';

@Component({
  selector: 'app-display-friends',
  templateUrl: './display-friends.component.html',
  styleUrls: ['./display-friends.component.css']
})
export class DisplayFriendsComponent implements OnInit {

  constructor(
    public userService: UserServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  public users: UserModel[];
  public pop = new Popups();
  public searchFriend: string;

  ngOnInit(): void {
    this.displayUsers();
  }

  displayUsers(): void{
    try {
      this.userService
      .displayUsers()
      .subscribe(
        data => {
          this.users = data;
        },
        error => {
          console.log(error);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

}
