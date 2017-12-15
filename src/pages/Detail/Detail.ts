import { Component } from '@angular/core';
import { NavController,AlertController ,NavParams} from 'ionic-angular';
import {RecettesPage } from '../Recettes/Recettes';
import * as firebase from 'firebase';
import {AngularFireDatabase} from 'angularfire2/database-deprecated';
import { CommentPage} from '../comment/comment';
import { Toast } from '@ionic-native/toast';
@Component({
  selector: 'page-Detail',
  templateUrl: 'Detail.html'
})

export class DetailPage {
  
  name;
  nb=0;
  nb2=0;
imegesList:object []=[];
howtouse: Object[] = [];
constructor( public db : AngularFireDatabase,private toast: Toast,public navCtrl: NavController,public alertCtrl: AlertController,public navp : NavParams) {
this.name= this.navp.get('name');
 
  /*this.s=this.db.list('/images').subscribe(data=>{
      this.imegesList=data;
  });
*/
this.howtouse=this.name.HowToUseProdect;
console.log(this.howtouse);
  this.db.list('/images', {
    query: {
      orderByChild:'URL',
      equalTo: this.name.URL
    }
    }).subscribe(data => {   
      this.imegesList=data;
  
    });
   
   
          
   }

   Addfavoris(a){
    this.nb2=this.nb2+1;
    if(this.nb2<2)
    {
    firebase.auth().onAuthStateChanged((user) =>  {if (user) { 
    this.db.list('/favoris').push({
      object: a,
      createdBy: firebase.auth().currentUser.uid
    });
    console.log(' Ajouter aux favoris'); }
    else{
     
      this.toast.show(`Connectez vous`, '5000', 'bottom').subscribe(
        toast => {
         
        }
      );
    }
    });
  }
  }


   Deletefavoris(a){
    
    this.db.list('/favoris', {
      query: {
        orderByChild:'object',
        equalTo: a
      }
      }).remove();
             
        }

        Comment(a){
          firebase.auth().onAuthStateChanged((user) =>  {if (user) { 
            this.navCtrl.push(CommentPage,{'product':a});}
            else{
              this.toast.show(`Connectez vous`, '5000', 'bottom').subscribe(
                toast => {
                 
                }
              );
            }
        })}
        
        Like(a){
          var nbLikes=a.nbLikes+1;
           this.nb=this.nb+1;
           if(this.nb<2)
           {
          firebase.auth().onAuthStateChanged((user) =>  {if (user) { 
            this.db.list('/images').update(a.$key,{'nbLikes':nbLikes});
        }
         else{
        
          this.toast.show(`Connectez vous`, '5000', 'bottom').subscribe(
            toast => {
             
            }
          );
         }

        });
      }
      }


}

