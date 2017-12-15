import { Component,ViewChild } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import {SignUpPage} from '../SignUp/SignUp';
import {HomePage} from '../home/home';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class loginPage {

  @ViewChild('Username') Username;
  @ViewChild('Password') Password;


  constructor(public afAuth: AngularFireAuth ,public navCtrl: NavController,public alertCtrl: AlertController) {

  }

  Login(Email:string,Password:string){
    
      this.afAuth.auth.signInWithEmailAndPassword(Email,Password)
      .then(data => {
        this.navCtrl.setRoot(HomePage);
      })
      .catch(error => {
        let alert = this.alertCtrl.create({
          title: 'Incorrect username or password ! ',
          subTitle: 'error !',
          buttons: ['OK']
        });
        alert.present();
      })
  
      }

      SignUp(){
        this.navCtrl.push( SignUpPage);
      }

}
