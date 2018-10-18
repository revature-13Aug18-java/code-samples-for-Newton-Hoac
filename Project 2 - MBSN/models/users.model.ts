import { Preference } from './genre-preference.model';
import { LocationModel } from './location.model';
export class Users {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    aboutMe: string;
    location: LocationModel;
    prefs: Preference[];
    gender: string;
    pictureUrl: string;
    orientation: string;
    handler = {};

    
constructor(id: number, firstName: string, lastName: string, email: string, password: string, phoneNumber: string, aboutme: string, gender: string, pictureUrl: string, prefs: Preference[]){
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.phoneNumber = phoneNumber;
    this.aboutMe = this.aboutMe;
    this.pictureUrl = pictureUrl;
    this.gender = gender;
    this.prefs = prefs;
}
}
