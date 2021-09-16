import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from 'src/Models/UserModel';
import { UserServiceService } from 'src/Services/UserService/user-service.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(
    private userService: UserServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  public users: UserModel[];

  public searchUser: string;

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
        error => console.log(error)
      );
    } catch (error) {
      console.log(error);
    }
  }

  updateAuthority(user: UserModel): void{
    if(user.authority === 'user'){
      user.authority = 'admin';
    }else {
      user.authority = 'user'
    }
    try {
      this.userService
      .updateUser(user._id, user)
      .subscribe(
        res => {
          console.log(res);
        },
        error => {
          console.log(error);
        }
      );
    } catch (error) {
      console.log(error)
    }
  }

  updateStatus(user: UserModel): void{
    if(user.status === 'block'){
      user.status = 'offline';
    }else {
      user.status = 'block';
    }
    try {
      this.userService
      .updateUser(user._id, user)
      .subscribe(
        res => {
          console.log(res);
        },
        error => {
          console.log(error);
        }
      );
    } catch (error) {
      console.log(error)
    }
  }

  deleteUser(id: string): void{
    try {
      this.userService
      .deleteUser(id)
      .subscribe(
        res => {
          console.log(res);
        },
        error => {
          console.log(error);
        }
      )
    } catch (error) {
      console.log(error);
    }
  }

  // displayUsers(): void{
  //   try {
  //     this.userService
  //     .getData('display-users')
  //     .subscribe(
  //       data => {
  //         console.log(data);
  //         this.users = data;
  //       },
  //       error => console.log(error)
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

}
