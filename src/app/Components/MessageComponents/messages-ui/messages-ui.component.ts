import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { error } from 'protractor';
import { MessageModel } from 'src/Models/MessageModel';
import { UserModel } from 'src/Models/UserModel';
import { MessageServiceService } from 'src/Services/MessageService/message-service.service';
import { UserServiceService } from 'src/Services/UserService/user-service.service';
import * as $ from 'jquery';
import { InfoSharingService } from 'src/Services/InfoSharing/info-sharing.service';
import { Popups } from 'src/Models/Popups';
import Swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-messages-ui',
  templateUrl: './messages-ui.component.html',
  styleUrls: ['./messages-ui.component.css']
})
export class MessagesUiComponent implements OnInit, AfterViewChecked{

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  constructor(
    public userService: UserServiceService,
    private messageService: MessageServiceService,
    private dataSharingService: InfoSharingService
  ) { }

  ngOnInit(): void {
    this.getFriendId();
    this.displayUser();
    this.displayUserMessage();
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  public pop = new Popups();
  public moment:any = moment;

  //user models
  public users: UserModel[];
  public user = new UserModel();
  public friend = new UserModel();

  //get Id from user friend list
  public friendId:string;

  //socket varible
  public newMessage: string;
  public feedback: string;
  public messageList: any[] = [];

  public userList: any[] = [];
  public disconectUserList: any[] = [];
  
  //message model
  public mes = new MessageModel();
  public mess: MessageModel[];

  //search message
  public searchMessage: string;

  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
  }

  //current User
  displayUser(): void{
    try {
      this.userService
      .displayUserById(this.userService.getId())
      .subscribe(
        data => {
          this.user = data;
          this.FeedBack();
          this.getMessage();
          this.addUser();
        },
        error => {
          console.log(error);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  //get friend Id from friend list
  getFriendId(): void{
    try {
      this.dataSharingService
      .currentId
      .subscribe(
        data => {
          this.friendId = data;
          if(this.friendId !== ''){
            this.displayFriend();
          }
        },error => console.log(error)
      );
    } catch (error) {
      console.log(error);
    }
  }

  //display friend data
  displayFriend(): void{
    try {
      this.userService
      .displayUserById(this.friendId)
      .subscribe(
        data => {
          this.friend = data;
        },
        error => {
          console.log(error);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  //Socket new user join the chat
  addUser(): void{
    try {
      this.messageService
      .sendMessge(
        'add-user',
        {
          userId: this.user._id,
          name: this.user.userName,
          dateTime: new Date()
        }
      );
      this.onlineUser();
    } catch (error) {
      console.log(error);
    }
  }

  onlineUser(): void{
    try {
      this.messageService
      .getMessages('add-user')
      .subscribe(
        data => {
          this.userList.push(data);
        },
        error => console.log(error)
      );
    } catch (error) {
      console.log(error);
    }
  }

  // live message
  getMessage(): void{
    try {
      this.messageService
      .getMessages('message')
      .subscribe(
        data => {
          this.messageList.push(data);
        },
        error => console.log(error)
      );
    } catch (error) {
      console.log(error);
    }
  }

  //display user messages from database
  displayUserMessage(): void{
    try {
      this.userService
      .displayUserMessages(this.userService.getId())
      .subscribe(
        data => {
          this.mess = data;
        },
        error => {
          console.log(error);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  //if the user is typeing message
  messageTyping(): void{
    this.getValue();
    try {
      this.messageService
      .sendMessge(
        'feedback',
        this.mes
      );
    } catch (error) {
      console.log(error);
    }
  }

  FeedBack(): void {
    try {
      this.messageService
      .getMessages('feedback')
      .subscribe(
        data => {
          this.feedback = `${data} is typing✍...`;
        },
        error => console.log(error)
      );
    } catch (error) {
      console.log(error);
    }
  }

  //send message to socket
  sendMessage(): void{
    this.feedback = '';
    try {
      this.messageService
      .sendMessge(
        'message',
        {
          creator: this.user._id,
          userName: this.user.userName,
          message: this.newMessage,
          sendTo: this.friendId,
          createdAt: new Date()
        }
      );
      this.saveMessage();
      this.newMessage = '';
    } catch (error) {
      console.log(error);
    }
  }

  getValue(): void{
    this.mes.creator = this.user._id;
    this.mes.userName = this.user.userName;
    this.mes.message = this.newMessage;
    this.mes.sendTo = this.friendId;
  }

  //store the message in database
  saveMessage(): void{
    this.getValue();
    try {
      this.userService
      .addUserMessage(this.userService.getId(), this.mes)
      .subscribe(
        res => {
          // console.log(res);
        },
        error => {
          if(error.status === 201){

          }else{
            console.log(error);
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  //confirm remove friend from list
  confirmRemoveFriend(friend: UserModel): void{
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to remove '+friend.userName+' from your friend list',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.removeFriend(friend);
      }
    })
  }

  //remove friend from list
  removeFriend(friend: UserModel): void{
    try {
      this.userService
      .removeFriend(this.userService.getId(), friend)
      .subscribe(
        res => {
          this.successAlert(friend);
        },
        error => {
          this.failedAlert();
          console.log(error);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  successAlert(friend: UserModel): void{
    this.pop.tostTimeAlert(
      'Success!!!',
      friend.userName+' removed from friend list successfully',
      'success',
      3000
    );
    location.reload();
  }

  failedAlert(): void{
    this.pop.tostTimeAlert(
      'Failed!!!',
      'Failed to remove friend please try again',
      'error',
      3000
    );
  }

}
