import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Popups } from 'src/Models/Popups';
import { UserServiceService } from 'src/Services/UserService/user-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuardGuard implements CanActivate {

  constructor(
    private userService: UserServiceService,
    private router: Router
  ) { }

  public pop = new Popups();

  canActivate(): boolean{
    if(this.userService.LoggedIn()){
      return true;
    }else{
      this.pop.basicAlert(
        'Alert!!!',
        'You must login first to access this...',
        'info'
      );
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
