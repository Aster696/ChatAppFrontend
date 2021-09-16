import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { MessageModel } from 'src/Models/MessageModel';
import { routes } from 'src/environments/routes';


@Injectable({
  providedIn: 'root'
})
export class MessageServiceService {

  constructor(
    private socket: Socket,
    private http: HttpClient,
    private router: Router
  ) { 
    socket;
  }

  private ro = new routes();

  public sendMessge(eventName: string, data: any): Observable<any>{
    return this.socket.emit(eventName, data);
  }

  public getMessages(eventName: string): Observable<any>{
    return new Observable((subscribe) => {
      this.socket.on(eventName, (data: any) => {
        // console.log(message);
        subscribe.next(data);
      });
    });
  }

  public addMessage(messageModel: MessageModel): Observable<any>{
    const api_url = `${this.ro.url}/message/add-message`; 
    return this.http.post<any>(api_url, messageModel);
  }

  public displayMessages(): Observable<any>{
    const api_url = `${this.ro.url}/message/display-messages`; 
    return this.http.get<any>(api_url);
  }
  
}