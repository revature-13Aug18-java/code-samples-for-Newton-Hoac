
import { Preference } from './../../models/genre-preference.model';
import { GenrePreferenceService } from './../../services/genre-preference.service';
import { UsersService } from './../../services/users.service';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';
import { SessionServiceService } from '../../services/session-service.service';
import { Users } from 'src/app/models/users.model';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { RegisterService } from 'src/app/services/register.service';
import { resolve } from 'url';


@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MyProfileComponent implements OnInit {
  dataSaved = false;
  editProfileForm: FormGroup;
  allUsers$: Observable<Users[]>;
  promise: Promise<Users>;
  updateUser: Users;
  selectedGenres: string[];

  constructor(public nav: NavbarService,
     private formBuilder: FormBuilder,  
     private userService: UsersService,
     private genrePreferenceService: GenrePreferenceService) { }
  sessionId:string;

  ngOnInit() {
    this.sessionId = JSON.parse(sessionStorage.id);
    console.log(this.sessionId);
    this.nav.show();
    this.editProfileForm = this.formBuilder.group({
      firstName: ['', [ Validators.required ] ],
      lastName: ['', [ Validators.required ] ],
      password: ['', [ Validators.required ] ],
      email: ['', [ Validators.required ] ],
      phoneNumber: ['', [ Validators.required ] ],
      gender: ['', [ Validators.required ] ],
      orientation: ['', [ Validators.required ] ],
      aboutMe:  ['', [ Validators.required ] ],
    });

  }

  onChangesSavedSubmit() {
    this.promise = new Promise<Users>((resolve)=>{
      resolve(this.userService.getUserById(this.sessionId))
    });
    this.promise.then((value)=>{
      this.updateUser = value;
      console.log(this.updateUser);
      // Pull values from form into updateUser
      if(this.editProfileForm.get("firstName").value != ''){
        console.log("firstName: " + this.editProfileForm.get("firstName").value);
        this.updateUser.firstName = this.editProfileForm.get("firstName").value;
        console.log(this.updateUser.firstName);
      }
      if(this.editProfileForm.get("lastName").value != ''){
        console.log("lastName: " + this.editProfileForm.get("lastName").value);
        this.updateUser.lastName = this.editProfileForm.get("lastName").value;
        console.log(this.updateUser.lastName);
      }
      if(this.editProfileForm.get("email").value != ''){
        console.log("email: " + this.editProfileForm.get("email").value);
        this.updateUser.email = this.editProfileForm.get("email").value;
        console.log(this.updateUser.email);
      }
      if(this.editProfileForm.get("password").value != ''){
        console.log("password changed ");
        this.updateUser.password = this.editProfileForm.get("password").value;
      }
      if(this.editProfileForm.get("phoneNumber").value != ''){
        console.log("phoneNumber: " + this.editProfileForm.get("phoneNumber").value);
        this.updateUser.phoneNumber = this.editProfileForm.get("phoneNumber").value;
        console.log(this.updateUser.phoneNumber);
      }
      if(this.editProfileForm.get("gender").value != ''){
        console.log("gender: " + this.editProfileForm.get("gender").value);
        this.updateUser.gender = this.editProfileForm.get("gender").value;
        console.log(this.updateUser.gender);
      }
      if(this.editProfileForm.get("pictureUrl").value != ''){
        console.log("pictureUrl: " + this.editProfileForm.get("pictureUrl").value);
        this.updateUser.pictureUrl = this.editProfileForm.get("pictureUrl").value;
        console.log(this.updateUser.pictureUrl);
      }
      if(this.editProfileForm.get("aboutMe").value != ''){
        console.log("aboutMe: " + this.editProfileForm.get("aboutMe").value);
        this.updateUser.aboutMe = this.editProfileForm.get("aboutMe").value;
        console.log(this.updateUser.aboutMe);
      }
      this.userService.editUser(this.updateUser).subscribe((value)=>{
        console.log("after edit: ");
        console.log(value);
      });
      // Nullify all existing preferences
      this.updateUser.prefs.forEach((pref)=>{
        pref.genre = null;
        // console.log(pref);
        this.genrePreferenceService.editPreference(pref).subscribe((value)=>{
        });
      });
      // Update with new preferences
      var pLevel = 1;
      var newPref: Preference;
      this.selectedGenres = JSON.parse(sessionStorage.genres);
      this.selectedGenres.forEach(pref => {
        newPref = new Preference(Number(this.sessionId), pLevel, pref);
        pLevel++;
        this.genrePreferenceService.editPreference(newPref).subscribe((value)=>{
          console.log(value);
        });
      });
    });
    
  }

}

// change message with current id when edit profile button is clicked, then execute navigate, then pull id