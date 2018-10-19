import { NavbarService } from './../../services/navbar.service';
import { FriendsService } from './../../services/friends.service';
import { Users } from 'src/app/models/users.model';
import { UsersService } from 'src/app/services/users.service';
import { Component, OnInit, ElementRef } from '@angular/core';
import { Friends } from '../../models/friends.model';

@Component({
  selector: 'app-user-live-search',
  templateUrl: './user-live-search.component.html',
  styleUrls: ['./user-live-search.component.css']
})
export class UserLiveSearchComponent implements OnInit {

  sessionId: string;
  searchStr: string;
  searchResults: Users[];
  currFriends: Friends[];

  currFriendBool = false;

  constructor(private elementRef: ElementRef,
    private usersService: UsersService,
    private friendsService: FriendsService,
    private navbarService: NavbarService) { }

  ngOnInit() {
    this.navbarService.show();
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = "rgb(33, 33, 33)";
    this.sessionId = JSON.parse(sessionStorage.id);
    console.log("id: " + this.sessionId);
    this.friendsService.getFriendsByPerson(this.sessionId).subscribe((value)=>{
      this.currFriends = value;
    })
  }

  searchUsers(){
    this.searchResults = new Array();
    console.log(this.searchStr);
    this.usersService.searchUsers(this.searchStr).subscribe((search)=>{
      // this.searchResults = search;
      search.forEach((newFriend)=>{
        this.currFriends.forEach((oldFriend)=>{
          if(oldFriend.isFriendsWith == newFriend.id || Number(this.sessionId) == newFriend.id){
            this.currFriendBool = true;
          }
        })
        if (!this.currFriendBool){
          this.searchResults.push(newFriend);
        }
        this.currFriendBool = false;
      })
      
    })
  }

  addFriend(event){
    console.log(event);
    console.log(event.srcElement.parentElement.className);

  }
}
