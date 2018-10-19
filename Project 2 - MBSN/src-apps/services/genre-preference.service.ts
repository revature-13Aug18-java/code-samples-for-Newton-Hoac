import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Preference } from '../models/genre-preference.model';

@Injectable({
  providedIn: 'root'
})
export class GenrePreferenceService {
  url: string = '/preferences';

  constructor(private http: HttpClient) { }

  getPreferencesByUserId(id: number): Observable<Preference[]>{
    return this.http.get<Preference[]>(this.url+"/"+id);
  }

  editPreference(pref: Preference): Observable<Preference>{
    return this.http.put<Preference>(this.url, pref);
  }
}
