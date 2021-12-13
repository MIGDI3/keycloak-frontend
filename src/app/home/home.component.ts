import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  username:String='';

  constructor(private messageService:MessageService) { }

  ngOnInit(): void {
    this.messageService.getMessage().subscribe(res=>{
      this.username = res[`text`];
    },
    err => console.log(err));
  }

}
