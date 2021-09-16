import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { UserAuthGuardGuard } from 'src/AuthGuard/user-auth-guard.guard';
import { MessageServiceService } from 'src/Services/MessageService/message-service.service';
import { TokenInterceptorService } from 'src/Services/TokenInterceptor/token-interceptor.service';
import { UserServiceService } from 'src/Services/UserService/user-service.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminNavBarComponent } from './Components/AdminComponents/admin-nav-bar/admin-nav-bar.component';
import { DisplayUserComponent } from './Components/AdminComponents/display-user/display-user.component';
import { MessageListComponent } from './Components/AdminComponents/message-list/message-list.component';
import { UserListComponent } from './Components/AdminComponents/user-list/user-list.component';
import { AboutUsComponent } from './Components/BasicComponents/about-us/about-us.component';
import { ContactUsComponent } from './Components/BasicComponents/contact-us/contact-us.component';
import { FooterComponent } from './Components/BasicComponents/footer/footer.component';
import { HomeComponent } from './Components/BasicComponents/home/home.component';
import { NavBarComponent } from './Components/BasicComponents/nav-bar/nav-bar.component';
import { PageNotFoundComponent } from './Components/BasicComponents/page-not-found/page-not-found.component';
import { DisplayFriendComponent } from './Components/FriendsComponents/display-friend/display-friend.component';
import { DisplayFriendsComponent } from './Components/FriendsComponents/display-friends/display-friends.component';
import { ChatMainContainerComponent } from './Components/MessageComponents/chat-main-container/chat-main-container.component';
import { MessagesUiComponent } from './Components/MessageComponents/messages-ui/messages-ui.component';
import { UserListUiComponent } from './Components/MessageComponents/user-list-ui/user-list-ui.component';
import { LoginComponent } from './Components/UserComponents/login/login.component';
import { RegisterComponent } from './Components/UserComponents/register/register.component';
import { UpdateUserComponent } from './Components/UserComponents/update-user/update-user.component';
import { UserProfileComponent } from './Components/UserComponents/user-profile/user-profile.component';
import { FriendRequestListComponent } from './Components/FriendsComponents/friend-request-list/friend-request-list.component';
import { ForgetPasswordComponent } from './Components/UserComponents/ForgetPassword/forget-password/forget-password.component';
import { GetOtpComponent } from './Components/UserComponents/ForgetPassword/get-otp/get-otp.component';
import { ChangePasswordComponent } from './Components/UserComponents/ForgetPassword/change-password/change-password.component';
import { routes } from 'src/environments/routes';

const ro = new routes();
const config: SocketIoConfig = { url: ro.url, options: {} };

@NgModule({
  declarations: [
    AppComponent,
    MessagesUiComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AboutUsComponent,
    ContactUsComponent,
    FooterComponent,
    UserListComponent,
    MessageListComponent,
    DisplayUserComponent,
    PageNotFoundComponent,
    AdminNavBarComponent,
    NavBarComponent,
    UserListUiComponent,
    UpdateUserComponent,
    UserProfileComponent,
    DisplayFriendComponent,
    DisplayFriendsComponent,
    ChatMainContainerComponent,
    FriendRequestListComponent,
    ForgetPasswordComponent,
    GetOtpComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot(config),
    HttpClientModule,
    Ng2SearchPipeModule
  ],
  providers: [
    UserServiceService,
    MessageServiceService,
    UserAuthGuardGuard,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
