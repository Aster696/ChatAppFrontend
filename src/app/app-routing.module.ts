import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAuthGuardGuard } from 'src/AuthGuard/user-auth-guard.guard';
import { AdminNavBarComponent } from './Components/AdminComponents/admin-nav-bar/admin-nav-bar.component';
import { DisplayUserComponent } from './Components/AdminComponents/display-user/display-user.component';
import { MessageListComponent } from './Components/AdminComponents/message-list/message-list.component';
import { UserListComponent } from './Components/AdminComponents/user-list/user-list.component';
import { AboutUsComponent } from './Components/BasicComponents/about-us/about-us.component';
import { ContactUsComponent } from './Components/BasicComponents/contact-us/contact-us.component';
import { HomeComponent } from './Components/BasicComponents/home/home.component';
import { PageNotFoundComponent } from './Components/BasicComponents/page-not-found/page-not-found.component';
import { DisplayFriendComponent } from './Components/FriendsComponents/display-friend/display-friend.component';
import { DisplayFriendsComponent } from './Components/FriendsComponents/display-friends/display-friends.component';
import { FriendRequestListComponent } from './Components/FriendsComponents/friend-request-list/friend-request-list.component';
import { MessagesUiComponent } from './Components/MessageComponents/messages-ui/messages-ui.component';
import { ChangePasswordComponent } from './Components/UserComponents/ForgetPassword/change-password/change-password.component';
import { ForgetPasswordComponent } from './Components/UserComponents/ForgetPassword/forget-password/forget-password.component';
import { GetOtpComponent } from './Components/UserComponents/ForgetPassword/get-otp/get-otp.component';
import { LoginComponent } from './Components/UserComponents/login/login.component';
import { RegisterComponent } from './Components/UserComponents/register/register.component';
import { UserProfileComponent } from './Components/UserComponents/user-profile/user-profile.component';
import { UserLoggedInGuard } from 'src/AuthGuard/user-logged-in.guard';

const routes: Routes = [
   //Default route ---------------------------------------------------------
   {path: '', redirectTo: 'home', pathMatch: 'full'},
   //Basic component route -------------------------------------------------
   {path: 'home', component: HomeComponent, canActivate: [UserAuthGuardGuard]},
   {path: 'aboutus', component: AboutUsComponent},
   {path: 'contactus', component: ContactUsComponent},
   //User component route --------------------------------------------------
   {path: 'register', component: RegisterComponent, canActivate: [UserLoggedInGuard]},
   {path: 'login', component: LoginComponent, canActivate: [UserLoggedInGuard]},
   {path: 'my-profile', component: UserProfileComponent, canActivate: [UserAuthGuardGuard]},
  //  {path: 'forgot-password', component: ForgetPasswordComponent, canActivate: [UserLoggedInGuard]},
  //  {path: 'get-otp', component: GetOtpComponent, canActivate: [UserLoggedInGuard]},
  //  {path: 'reset-password/:token', component: ChangePasswordComponent, canActivate: [UserLoggedInGuard]},
   //Friends list ----------------------------------------------------------
   {path: 'display-friend-requests', component: FriendRequestListComponent, canActivate: [UserAuthGuardGuard]},
   {path: 'display-friends', component: DisplayFriendsComponent, canActivate: [UserAuthGuardGuard]},
   {path: 'display-friend/:id', component: DisplayFriendComponent, canActivate: [UserAuthGuardGuard]},
   //Message component route -----------------------------------------------
   {path: 'message', component: MessagesUiComponent, canActivate: [UserAuthGuardGuard]},
   //Admin component route -------------------------------------------------
   {path: 'admin', component: AdminNavBarComponent, canActivate: [UserAuthGuardGuard]},
   {path: 'user-list', component: UserListComponent, canActivate: [UserAuthGuardGuard]},
   {path: 'display-user/:id', component: DisplayUserComponent, canActivate: [UserAuthGuardGuard]},
   {path: 'message-list', component: MessageListComponent, canActivate: [UserAuthGuardGuard]},
   //Error route -----------------------------------------------------------
   {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
