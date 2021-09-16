import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserModel } from 'src/Models/UserModel';
import { UserServiceService } from 'src/Services/UserService/user-service.service';
import { Popups } from 'src/Models/Popups';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(
    public userService: UserServiceService,
  ) { }


  ngOnInit(): void {
    this.checkUser();
  }

  public user = new UserModel();
  private popUp = new Popups();
  private jwtHelperService = new JwtHelperService();

  checkUser(): void {
    if(this.userService.LoggedIn()){
      const isExpired = this.jwtHelperService.isTokenExpired(this.userService.getToken());
      // console.log(isExpired);
      if(isExpired){
        console.log('session expired');
        this.popUp.tostAlert(
          'Session Expired!!!',
          'You need to login again',
          'info'
        );
        this.logOut();
      }else{
        this.displayUser();
      }
    }
  }

  displayUser(): void{
    try {
      this.userService
      .displayUserById(this.userService.getId())
      .subscribe(
        data => {
          this.user = data;
        },
        error => {
          // console.log(error);
        }
      );
    } catch (error) {
      // console.log(error);
    }
  }

  updateUser(): void{
    try {
      this.userService
      .updateUser(this.user._id, this.user)
      .subscribe(
        res => {

        },
        error => {
          console.log(error);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  userAccess(): boolean{
    return this.userService.LoggedIn();
  }

  adminAccess(): boolean{
    if(this.userService.LoggedIn() && this.userService.getAuth() === 'admin'){
      return true;
    }
    return false;
  }

  logOut(): void{
    this.userService.logOut();
  }

}
