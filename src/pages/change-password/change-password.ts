import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';

/**
 * Generated class for the ChangePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {

  user;
  password: String;
  confirmpassword: String;

  constructor(public navCtrl: NavController, public navParams: NavParams, public database: DatabaseProvider, public toast: ToastController, public view: ViewController) {
    this.user = this.navParams.get('user');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePasswordPage');
  }
  
  submitPassword(){
    if(this.password === this.confirmpassword && this.password && this.confirmpassword) {
      this.user.password = this.password;
      this.database.createJournalPassword(this.user).then(res => {
        console.log(res);
        this.presentToast('Password changed successfully');
        this.view.dismiss(true);
      })
    } else if(this.password !== this.confirmpassword) {
      this.presentToast('Password not match');
    } else {
      this.presentToast('Pleae fill up fields')
    }
  }
  presentToast(message) {
    const toast = this.toast.create({
      message: message,
      duration: 3000
    });
    toast.present();
   }

   back(){
     this.view.dismiss(false);
   }

}
