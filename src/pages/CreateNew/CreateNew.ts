import { Component,ViewChild } from '@angular/core';
import { NavController,AlertController,NavParams } from 'ionic-angular';
import {RecettesPage } from '../Recettes/Recettes';
import { AngularFireAuth } from 'angularfire2/auth';
import {AngularFireDatabase} from 'angularfire2/database-deprecated';
import * as firebase from 'firebase';
import { DateTime } from 'ionic-angular/components/datetime/datetime';
import { Camera } from '@ionic-native/camera';
import { Http } from '@angular/http';
import { Toast } from '@ionic-native/toast';
declare var window: any;
@Component({
  selector: 'page-CreateNew',
  templateUrl: 'CreateNew.html'
})

export class CreateNewPage {

@ViewChild ('ProdectName') ProdectName;
@ViewChild ('ProdectDescription') ProdectDescription;
@ViewChild ('HowToUseProdect') HowToUseProdect;

file: File;
name:string;
listRecettes : String[]=[];
picdata:any;
picurl:any;
categorie;
  constructor(public afAuth: AngularFireAuth,private toast: Toast,public navp : NavParams ,private camera: Camera,public db : AngularFireDatabase,public navCtrl: NavController,public alertCtrl: AlertController) {
     
    this.categorie= this.navp.get('cat');  
 
   }
   
  GoRecettesPage(){
    this.navCtrl.push(RecettesPage);
  }

  makeFileIntoBlob(_imagePath) {
    
      // INSTALL PLUGIN - cordova plugin add cordova-plugin-file
      return new Promise((resolve, reject) => {
        window.resolveLocalFileSystemURL(_imagePath, (fileEntry) => {
    
          fileEntry.file((resFile) => {
    
            var reader = new FileReader();
            reader.onloadend = (evt: any) => {
              var imgBlob: any = new Blob([evt.target.result], { type: 'image/jpeg' });
              imgBlob.name = 'sample.jpg';
              resolve(imgBlob);
            };
    
            reader.onerror = (e) => {
              console.log('Failed file read: ' + e.toString());
           
              reject(e);
            };
    
            reader.readAsArrayBuffer(resFile);
          });
        });
      });
    }
 
 
 load(){
  
   this.camera.getPicture({
       quality: 100,
       destinationType: this.camera.DestinationType.FILE_URI,
       sourceType:this.camera.PictureSourceType.CAMERA,
       targetHeight :640,
       correctOrientation:true
      
   }).then(_imageData=>{
    let base64Image = 'data:image/jpeg;base64,' + _imageData;
     this.picdata=base64Image
    
    return this.makeFileIntoBlob(_imageData);
   }).then((blob)=>{
    this.toast.show(`Image enregistrer avec succes`, '5000', 'bottom');
            this.picdata=blob;
   },(error)=>{
          alert(error);
   });

 }


   saveProfile_click() {
    this.afAuth.authState.subscribe(auth => {
          this.uploadProfileImage();
          this.navCtrl.pop();
 
    })
   
  }

 
  

   uploadProfileImage(){
   
    
    var ref= firebase.database().ref('images');
    var ProdectName= this.ProdectName.value;
    var ProdectDescription= this.ProdectDescription.value;
    var HowToUseProdect= this.ProdectName.value;
    var cat=this.categorie;
    var comment: Object[] = [];
    comment.push({fd:"vn"});
    var liste= this.listRecettes;
    let fileRef = firebase.storage().ref('profileImages/' +firebase.auth().currentUser.uid+this.name+ ".jpg");
    
    fileRef.put(this.picdata).then(function(snapshot) {
      ref.push({
        'URL':snapshot.downloadURL,
        'name':snapshot.metadata.name,
        'owner':firebase.auth().currentUser.uid,
        'email':firebase.auth().currentUser.email,
        'lastUpdate':new Date().getTime(),
        'ProdectName':ProdectName,
        'ProdectDescription':ProdectDescription,
        'HowToUseProdect':liste,
        Comment:comment,
        nbLikes:0,
        nbComment:0,
        Categorie:cat
        
   
      })
     
    
    });

    this.toast.show(`Ajouter avec succes`, '5000', 'bottom').subscribe(
      toast => {
       
      }
    );
  }

  AddList(){
    this.listRecettes.push(this.HowToUseProdect.value);
    this.HowToUseProdect.value="";

  }
 

}
