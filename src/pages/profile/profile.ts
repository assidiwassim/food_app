import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as firebase from 'firebase';
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})



export class profilePage {
   user = firebase.auth().currentUser;
  name; email; photoUrl;  
  constructor(public navCtrl: NavController) {
   
    if (firebase.auth().currentUser != null) {
      this.name = firebase.auth().currentUser.displayName;
      this.email = firebase.auth().currentUser.email;
      this.photoUrl = firebase.auth().currentUser.photoURL;
     
  
    }


  }
  

}
