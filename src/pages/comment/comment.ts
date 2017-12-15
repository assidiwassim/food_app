import { Component,ViewChild } from '@angular/core';
import { NavController,AlertController,NavParams } from 'ionic-angular';
import {RecettesPage } from '../Recettes/Recettes';
import { AngularFireAuth } from 'angularfire2/auth';
import {AngularFireDatabase} from 'angularfire2/database-deprecated';
import * as firebase from 'firebase';
import { DateTime } from 'ionic-angular/components/datetime/datetime';


@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html'
})

export class CommentPage {


@ViewChild ('myInput') myInput;

comment: Object[] = [];
product;
nbComment=0;
  constructor(public afAuth: AngularFireAuth ,public navp : NavParams,public db : AngularFireDatabase,public navCtrl: NavController,public alertCtrl: AlertController) {
  
    this.product= this.navp.get('product');
    this.comment=this.product.Comment;
    this.nbComment=this.product.nbComment;

   }

   addComment(){

    var x= this.myInput.value;
    var user=firebase.auth().currentUser.displayName;
    this.comment.push({"com":x,"user":user});
 
     var list=this.comment;
     var com=this.nbComment+1
     console.log(com);

     this.db.list('/images').update(this.product.$key,{'Comment':list,'nbComment':com});
   }
    

}
