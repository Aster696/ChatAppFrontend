import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Popups } from 'src/Models/Popups';
import { UserModel } from 'src/Models/UserModel';
import { UserServiceService } from 'src/Services/UserService/user-service.service';

@Component({
  selector: 'app-display-friend',
  templateUrl: './display-friend.component.html',
  styleUrls: ['./display-friend.component.css']
})
export class DisplayFriendComponent implements OnInit {

  constructor(
    public userService: UserServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  public user = new UserModel();
  public pop = new Popups();

  ngOnInit(): void {
    this.displayUser();
  }

  displayUser(): void{
    let id: any = this.route.snapshot.paramMap.get('id');
    try {
      this.userService
      .displayUserById(id)
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

  addFriend(user: UserModel): void{
    try {
      this.userService
      .friendRequest(this.userService.getId(), user)
      .subscribe(
        res => {
          console.log(res);
          this.successAlert();
        },
        error => {
          if(error.status === 201){
            this.successAlert();
          }else if(error.status === 409){
            this.friendExist();
          }else{
            this.failedAlert();
            console.log(error);
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  successAlert(): void{
    this.pop.tostTimeAlert(
      'Success!!!',
      'Successfully added to your friend list',
      'success',
      2500
    );
  }

  friendExist(): void{
    this.pop.tostTimeAlert(
      'Info!!!',
      'Already added to you friend list',
      'info',
      3000
    );
  }

  failedAlert(): void{
    this.pop.tostTimeAlert(
      'Failed!!!',
      'failed to add to your friend list',
      'warning',
      2500
    );
  }

}
