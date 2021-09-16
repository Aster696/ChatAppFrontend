import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { routes } from 'src/environments/routes';
import { MessageModel } from 'src/Models/MessageModel';
import { UserModel } from 'src/Models/UserModel';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(
    private http: HttpClient,
    private socket: Socket,
    private router: Router,
    private route: ActivatedRoute
  ) { socket; }

  private ro = new routes();

  public register(formData: FormData): Observable<any>{
    const api_url = `${this.ro.url}/user/register`;
    return this.http.post<any>(api_url, formData);
  }

  public uploadImg(userModel: FormData): Observable<any>{
    const api_url = `${this.ro.url}/user/uploadImg`;
    return this.http.post<any>(api_url, userModel);
  }

  public login(userModel: UserModel): Observable<any>{
    const api_url = `${this.ro.url}/user/login`;
    return this.http.post<any>(api_url, userModel);
  }

  public updateUser(id: string, user: UserModel): Observable<any>{
    const api_url = `${this.ro.url}/user/update-user/`+id;
    return this.http.patch<any>(api_url, user);
  }

  public updateUserData(id: string, formData: FormData): Observable<any>{
    const api_url = `${this.ro.url}/user/update-user/`+id;
    return this.http.patch<any>(api_url, formData);
  }

  public deleteUser(id: string): Observable<any>{
    const api_url = `${this.ro.url}/user/delete-user/`+id;
    return this.http.delete<any>(api_url);
  }

  public getData(eventName: string): Observable<any>{
    return new Observable((subscribe) => {
      this.socket.on(eventName, (data: any) => {
        // console.log(message);
        subscribe.next(data);
      });
    });
  }

  public displayUsers(): Observable<any>{
    const api_url = `${this.ro.url}/user/display-users`;
    return this.http.get<any>(api_url);
  }

  public displayUserById(id: string): Observable<any>{
    const api_url = `${this.ro.url}/user/display-user/`+id;
    return this.http.get<any>(api_url);
  }

  public displayUserByEmail(email: string): Observable<any>{
    const api_url = `${this.ro.url}/user/display-user-by-email/`+email;
    return this.http.get<any>(api_url);
  }

  //send friend request
  public friendRequest(id: string, user: UserModel): Observable<any>{
    const api_url = `${this.ro.url}/user/friend-request/`+id;
    return this.http.patch<any>(api_url, user);
  }

  public removeFriendRequest(id: string, user: UserModel): Observable<any>{
    const api_url = `${this.ro.url}/user/remove-friend-request/`+id;
    return this.http.patch<any>(api_url, user);
  }

  //display friend request
  public displayFriendRequests(userId: any): Observable<any>{
    const api_url = `${this.ro.url}/user/display-friend-requests/`+userId;
    return this.http.get(api_url);
  }

  //add friends
  public addFriend(id: string, user: UserModel): Observable<any>{
    const api_url = `${this.ro.url}/user/add-friend/`+id;
    return this.http.patch<any>(api_url, user);
  }

  //delete friends
  public removeFriend(id: string, user: UserModel): Observable<any>{
    const api_url = `${this.ro.url}/user/remove-friend/`+id;
    return this.http.patch<any>(api_url, user);
  }

  //display all friends according to user Id
  public displayFriends(id: string): Observable<any>{
    const api_url = `${this.ro.url}/user/display-friends/`+id;
    return this.http.get<any>(api_url);
  }

  //add user message in database
  public addUserMessage(id: string, message: MessageModel): Observable<any>{
    const api_url = `${this.ro.url}/user/add-user-message/`+id;
    return this.http.post<any>(api_url, message);
  }

  //display user messages
  public displayUserMessages(id: string): Observable<any>{
    const api_url = `${this.ro.url}/user/display-user-messages/`+id;
    return this.http.get<any>(api_url);
  }

  public LoggedIn(): boolean{
    const accessToken:any = localStorage.getItem('accessToken');
    return !!accessToken;
  }

  public getToken(): any{
    const accessToken:any = localStorage.getItem('accessToken');
    return accessToken;
  }

  public getId(): any{
    const accessToken:any = localStorage.getItem('accessToken');
    const token:any = jwtDecode(accessToken)
    return token.audiance;
  }

  public getUserName(): any{
    const accessToken:any = localStorage.getItem('accessToken');
    const token:any = jwtDecode(accessToken)
    return token.name
  }

  public getAuth(): any{
    const accessToken:any = localStorage.getItem('accessToken');
    const token:any = jwtDecode(accessToken)
    return token.auth
  }

  public getStat(): any{
    const accessToken:any = localStorage.getItem('accessToken');
    const token:any = jwtDecode(accessToken)
    return token.stat
  }

  public forgotPassword(user: UserModel): Observable<any>{
    const api_url = `${this.ro.url}/user/forgot-password`;
    return this.http.post<any>(api_url, user);
  }

  public changePassword(user: UserModel): Observable<any>{
    const api_url = `${this.ro.url}/user/reset-password`;
    return this.http.patch<any>(api_url, user);
  }

  public logOut(): any{
    localStorage.removeItem('accessToken');
    this.router.navigate(['/login']);
  }

}
