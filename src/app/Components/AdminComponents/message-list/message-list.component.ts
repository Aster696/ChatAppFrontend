import { Component, OnInit } from '@angular/core';
import { MessageModel } from 'src/Models/MessageModel';
import { MessageServiceService } from 'src/Services/MessageService/message-service.service';
import { UserServiceService } from 'src/Services/UserService/user-service.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  constructor(
    private userService: UserServiceService,
    private messageService: MessageServiceService
  ) { }

  public searchMessage: string;
  public messages: MessageModel[];

  ngOnInit(): void {
    this.displayMessages();
  }

  displayMessages(): void{
    try {
      this.messageService
      .displayMessages()
      .subscribe(
        data => {
          this.messages = data;
        }, error => {
          console.log(error);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

}
