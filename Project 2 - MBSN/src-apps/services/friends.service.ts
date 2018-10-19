import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Friends } from '../models/friends.model';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {
  url: string = "/friends";

  constructor(private http: HttpClient) { }

  getFriendsByPerson(id: string): Observable<Friends[]> {
    return this.http.get<Friends[]>(this.url+"/p/"+id);
  }

  // addFriend(friend: Friends):
}
