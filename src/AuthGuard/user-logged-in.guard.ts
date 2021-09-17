import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserServiceService } from 'src/Services/UserService/user-service.service';
import { Popups } from 'src/Models/Popups';

@Injectable({
  providedIn: 'root'
})
export class UserLoggedInGuard implements CanActivate {

  constructor(
    private userService: UserServiceService,
    private router: Router
  ){}

  public pop = new Popups();

  canActivate(): boolean{
    if(!this.userService.LoggedIn()){
      return true;
    }else{
      this.pop.basicAlert(
        'Alert!!!',
        'You are logged in bruh. Access denied...',
        'info'
      );
      this.router.navigate(['/home']);
      return false;
    }
  }
  
}
