import { Component } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';
import {CreateNewPage} from '../CreateNew/CreateNew';
import * as firebase from 'firebase';
import {AngularFireDatabase} from 'angularfire2/database-deprecated';
import {DetailPage} from '../Detail/Detail';
import { Toast } from '@ionic-native/toast';
@Component({
  selector: 'page-Mesrecettes',
  templateUrl: 'Mesrecettes.html'
})

export class MesrecettesPage {

  s;
  imegesList:object []=[];  
  constructor( public db : AngularFireDatabase,private toast: Toast,public navCtrl: NavController,public alertCtrl: AlertController) {
    this.db.list('/images', {
      query: {
        orderByChild:'owner',
        equalTo: firebase.auth().currentUser.uid
      }
      }).subscribe(data => {this.imegesList=data;});
            
     }


     Remove(x){
      
      this.db.list('/images').remove(x.$key);
   
      this.toast.show(`Supprimer avec succes`, '5000', 'bottom').subscribe(
        toast => {
         
        }
      );
      
     }




}