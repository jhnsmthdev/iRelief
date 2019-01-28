import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { SelectEmotionPage } from '../select-emotion/select-emotion';
import { DatabaseProvider } from '../../providers/database/database';
import { User } from '../../model/user';

/**
 * Generated class for the CreateProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-profile',
  templateUrl: 'create-profile.html',
})
export class CreateProfilePage {
  user: User = {
    name: undefined,
    gender: 'Male'
  };
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public toast: ToastController,
    public database: DatabaseProvider
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateProfilePage');
  }
  gotoSelectEmotion() {
    if(this.user.name){
      this.database.insertUser(this.user).then(res => {
        console.log(res);
        this.navCtrl.setRoot(SelectEmotionPage);
      }).catch(err => {
        alert('Error: ' + err);
      })
    } else {
      const toast = this.toast.create( {
        message: 'Please enter your name',
        duration: 3000
      })
      toast.present();
    }
  }

}
