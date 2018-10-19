import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Users } from '../../models/users.model';
import { SessionServiceService } from '../../services/session-service.service';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  sessionId: string;

  constructor(private userService: UsersService,
     private router: Router,
     private sessionService: SessionServiceService,
     public nav: NavbarService) { }

  ngOnInit() {
    this.nav.hide();
    if (sessionStorage.id){
      this.sessionId = JSON.parse(sessionStorage.id);
      console.log("sessionId login: " + this.sessionId)
      this.router.navigateByUrl("/profile");
    }
    
  }

  loginForm = new FormGroup({
    emailAddress: new FormControl(),
    password: new FormControl()
  });
  
  user: Users;
  
  checkLogin(){
    let email = this.loginForm.get("emailAddress").value;
    let password = this.loginForm.get("password").value;
    var id = null;
    // console.log(email);
    // console.log(password);

    let promise = new Promise<Users>((resolve) => {
      resolve(this.userService.getUser(email, password));
    });

    promise.then((value)=>{
      this.user = value;
      // console.log(this.user.password);

      if(this.user.password === password){
        id = this.user.id;
      }
      if(id != null){
        this.sessionService.changeMessage(id);
        sessionStorage.id = JSON.stringify(id);
        this.router.navigateByUrl("/profile");
      }
    });

    
    // if(id != -1){
    //   promise = new Promise<Users>((resolve) => {
    //     resolve(this.userService.loginValid(id));
    //   });
    // }

    // promise.then((value)=>{
    //   if(value.id == id){
    //     console.log("cool");
    //     this.router.navigateByUrl("/profile");
    //   }
    // })

    // this.userService.getUser(email, password)subscribe((value) =>{
    //   console.log(value);
    // });


  }
}
