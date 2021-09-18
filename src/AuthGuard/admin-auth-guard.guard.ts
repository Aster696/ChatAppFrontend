import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserServiceService } from 'src/Services/UserService/user-service.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardGuard implements CanActivate {

  constructor(
    private userService: UserServiceService,
    private router: Router
  ){}

  canActivate(): boolean {
    if(this.userService.LoggedIn() && this.userService.getAuth() === 'admin' && this.userService.getStat() === 'online'){
      return true
    }
    this.router.navigate(['/home']);
    return false;
  }
  
}
