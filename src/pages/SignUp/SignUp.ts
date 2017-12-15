import { Component,ViewChild } from '@angular/core';
import { NavController ,AlertController} from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import {HomePage} from '../home//home'
@Component({
  selector: 'page-SignUp',
  templateUrl: 'SignUp.html'
})
export class SignUpPage {

 


  constructor(public afAuth: AngularFireAuth ,public navCtrl: NavController,public alertCtrl: AlertController) {

  }

  Signup(Username:string,Password:string,Password2:string,Email:string){
    if(Password!=Password2)
    {
      
        alert('Password does not match the confirm password');
       
    }
    else{


      this.afAuth.auth.createUserWithEmailAndPassword(Email,Password)
      .then(data => {
        
      })
      .catch(error => {
        let alert = this.alertCtrl.create({
          title: 'Login failed',
          subTitle: 'error !',
          buttons: ['OK']
        });
        alert.present();
      })
  

      firebase.auth().onAuthStateChanged(function(user) {
        
                        if (user) {
        
                          user.updateProfile({ 
        
                            displayName: Username,
                            photoURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcrQxTGOt1j7Ml6JFvLn3Fg982Ngoxt18U9rEvnz3tL9I-wVXc"
        
                          }).then(function() {
        
                          
        
                            var displayName = user.displayName;
                         
                            var photoURL = user.photoURL;
        
                          }, function(error) {
                               alert(error);
                          });     
        
                        }
            });
            this.navCtrl.setRoot( HomePage);
      }

    }
      

}
