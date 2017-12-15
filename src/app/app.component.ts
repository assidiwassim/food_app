import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { loginPage } from '../pages/login/login';
import { MesfavorisPage } from '../pages/Mesfavoris/Mesfavoris';
import { MesrecettesPage } from '../pages/Mesrecettes/Mesrecettes';
import { profilePage } from '../pages/profile/profile';
import { DeconnexionPage } from '../pages/Deconnexion/Deconnexion';

import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
const firebaseAuth = {
  apiKey: "AIzaSyDuNtdgwTE8lcdAqHnxZCeZ5rv4iWWD9Vk",
  authDomain: "database-367a8.firebaseapp.com",
  databaseURL: "https://database-367a8.firebaseio.com",
  projectId: "database-367a8",
  storageBucket: "database-367a8.appspot.com",
  messagingSenderId: "178275596260"
};
firebase.initializeApp(firebaseAuth);

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
 
  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,public afAuth: AngularFireAuth ) {
    this.initializeApp();
    
    
    firebase.auth().onAuthStateChanged((user) =>  {if (user) { 
        
    this.pages = [
      
      { title: 'Catégorie', component: HomePage },
      { title: 'Mes recettes', component: MesrecettesPage },
      { title: 'Mes favoris', component: MesfavorisPage },
      { title: 'Profile', component: profilePage },
      { title: 'Déconnexion', component: DeconnexionPage }
   
    ];
   
    } else { 
      this.pages = [
        
        { title: 'Catégorie', component: HomePage },
        { title: 'Login', component: loginPage }
     
      ];
  
    } });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

 
}
