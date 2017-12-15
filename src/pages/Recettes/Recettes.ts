import { Component } from '@angular/core';
import { NavController,AlertController,NavParams } from 'ionic-angular';
import {CreateNewPage} from '../CreateNew/CreateNew';
import * as firebase from 'firebase';
import {AngularFireDatabase} from 'angularfire2/database-deprecated';
import {DetailPage} from '../Detail/Detail';
import { Toast } from '@ionic-native/toast';
@Component({
  selector: 'page-Recettes',
  templateUrl: 'Recettes.html'
})
export class RecettesPage {
  s;
  imegesList:object []=[];
  categorie;
  constructor( public db : AngularFireDatabase,private toast: Toast,public navCtrl: NavController,public alertCtrl: AlertController,public navp : NavParams) {
    this.categorie= this.navp.get('cat');
  

    this.db.list('/images', {
      query: {
        orderByChild:'Categorie',
        equalTo: this.categorie
      }
      }).subscribe(data => {   this.imegesList=data;});
            
     }
            
     

     GoDetailPage(item){
       
       
          this.navCtrl.push(DetailPage,{'name':item});
     }

  add(){
    
    firebase.auth().onAuthStateChanged((user) =>  {
    if (user) { 

    this.navCtrl.push(CreateNewPage,{'cat':this.categorie});

  }
  else{
    this.toast.show(`connectez vous`, '5000', 'bottom').subscribe(
      toast => {
       
      }
    );
  
    }
  });
}

}
