import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { loginPage } from '../pages/login/login';
import { MesfavorisPage } from '../pages/Mesfavoris/Mesfavoris';
import { MesrecettesPage } from '../pages/Mesrecettes/Mesrecettes';
import { profilePage } from '../pages/profile/profile';
import { SignUpPage } from '../pages/SignUp/SignUp';
import { RecettesPage } from '../pages/Recettes/Recettes';
import { CreateNewPage } from '../pages/CreateNew/CreateNew';
import { DetailPage } from '../pages/Detail/Detail';
import { DeconnexionPage } from '../pages/Deconnexion/Deconnexion';
import { CommentPage } from '../pages/comment/comment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireDatabase } from "angularfire2/database-deprecated";
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Toast } from '@ionic-native/toast';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

const firebaseAuth = {
  apiKey: "AIzaSyDuNtdgwTE8lcdAqHnxZCeZ5rv4iWWD9Vk",
  authDomain: "database-367a8.firebaseapp.com",
  databaseURL: "https://database-367a8.firebaseio.com",
  projectId: "database-367a8",
  storageBucket: "database-367a8.appspot.com",
  messagingSenderId: "178275596260"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    loginPage,
    MesfavorisPage,
    MesrecettesPage,
    profilePage,
    SignUpPage,
    RecettesPage,
    CreateNewPage,
    DetailPage,
    DeconnexionPage,
    CommentPage


  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAuth),
    AngularFireAuthModule,
    AngularFireDatabaseModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    loginPage,
    MesfavorisPage,
    MesrecettesPage,
    profilePage,
    SignUpPage,
    RecettesPage,
    CreateNewPage,
    DetailPage,
    DeconnexionPage,
    CommentPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    Camera,
    Toast,
    
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
  
})
export class AppModule {}
