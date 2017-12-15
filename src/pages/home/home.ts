import { Component } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';
import {RecettesPage } from '../Recettes/Recettes';
import {AngularFireDatabase} from 'angularfire2/database-deprecated';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

CountPizza:object []=[];
CountGlase:object []=[];
Countfood:object []=[];
Countcupcakes:object []=[];
constructor( public db : AngularFireDatabase,public navCtrl: NavController,public alertCtrl: AlertController) {
//count Pizza
  this.db.list('/images', {
    query: {
      orderByChild:'Categorie',
      equalTo: 'Pizza'
    }
    }).subscribe(data => {   this.CountPizza=data;});

//Count food 
    this.db.list('/images', {
      query: {
        orderByChild:'Categorie',
        equalTo: 'Pizza'
      }
      }).subscribe(data => {   this.CountPizza=data;});

      this.db.list('/images', {
        query: {
          orderByChild:'Categorie',
          equalTo: 'food'
        }
        }).subscribe(data => {   this.Countfood=data;});

  //Count glase
        this.db.list('/images', {
          query: {
            orderByChild:'Categorie',
            equalTo: 'glase'
          }
          }).subscribe(data => {   this.CountGlase=data;});

//Count  cupcakes     
          this.db.list('/images', {
            query: {
              orderByChild:'Categorie',
              equalTo: 'cupcakes'
            }
            }).subscribe(data => {   this.Countcupcakes=data;});

       }
  

  GoRecettesPage(categorie){
    
    this.navCtrl.push(RecettesPage,{'cat':categorie});
  }

}
