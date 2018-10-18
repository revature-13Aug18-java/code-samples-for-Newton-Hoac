import { GenrePreferenceService } from './../../services/genre-preference.service';
import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Artist } from 'src/Artist';
import { Preference } from '../../models/genre-preference.model';
import { Jsonp } from '@angular/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [SpotifyService]
})
export class SearchComponent{

  constructor(private _spotifyService: SpotifyService,
    private genrePreferenceService: GenrePreferenceService) { }

    searchStr: string;
    searchRes: Artist[];

    selectedArtist: string;
    selectedGenres: string[] = new Array();
    currPreferences: Preference[];

    ngOnInit() {
      this.genrePreferenceService.getPreferencesByUserId(JSON.parse(sessionStorage.id)).subscribe((preferences)=>{
        this.currPreferences = preferences;
        this.currPreferences.forEach(preference => {
          this.selectedGenres.push(preference.genre);
        });
        sessionStorage.genres = JSON.stringify(this.selectedGenres);
      });
    }

    searchMusic() {
      this._spotifyService.searchMusic(this.searchStr)
      .subscribe((res) => {
        this.searchRes =  res.artists.items;
        console.log(this.searchRes);

      })
    }

    selectGenre(event){
      console.log("click triggered");
      // console.log(event.srcElement.id);
      if (event.srcElement.id == 'fake-link'){
        event.srcElement.id = 'highlighted-link';
        if(this.selectedGenres.indexOf(event.explicitOriginalTarget.data) == -1){
          console.log("genre not found. adding to array");
          if(this.selectedGenres.indexOf(null) == -1){
            this.selectedGenres.push(event.explicitOriginalTarget.data);
          } else {
            this.selectedGenres.splice(this.selectedGenres.indexOf(null), 1, event.explicitOriginalTarget.data);
          }
          console.log(this.selectedGenres);
        }
      } else {
        event.srcElement.id = 'fake-link';
        if(this.selectedGenres.indexOf(event.explicitOriginalTarget.data) != -1) {
          console.log("before: ");
          console.log(this.selectedGenres);
          this.selectedGenres.splice(this.selectedGenres.indexOf(event.explicitOriginalTarget.data), 1, null);
          console.log("after: ");
          console.log(this.selectedGenres);
        }
      }
      // console.log(event.explicitOriginalTarget.data);
      this.updateGenreSession();
    }

    removeGenre(event){
      console.log(event);
      console.log(event.srcElement.parentElement.id);
      this.selectedGenres.splice(this.selectedGenres.indexOf(event.srcElement.parentElement.id), 1, null);
      this.updateGenreSession();  
    }

    updateGenreSession(){
      sessionStorage.genres = JSON.stringify(this.selectedGenres);
    }
}
