import { Component } from '@angular/core';
import { NavController, ModalController, ToastController, ViewController } from 'ionic-angular';
import { SelectEmotionPage } from '../select-emotion/select-emotion';
import { JournalActionPage } from '../journal-action/journal-action';
import { DatabaseProvider } from '../../providers/database/database';
import { Journal } from '../../model/journal';
import moment from 'moment';
import { ChangePasswordPage } from '../change-password/change-password';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  user;
  password: String;
  confirmpassword: String;
  navbarColor= "light";
  journals: Array<Journal>;
  title = 'My Journal';
  isJournalPasswordSet: boolean;
  isLogin: boolean;
  constructor(public navCtrl: NavController, public modal: ModalController, public database: DatabaseProvider, public toast: ToastController,) {
    this.database.user.subscribe(res => {
      this.user = res;
      console.log(this.user);
      if(this.user.password) {
        this.title = "My Journal";
        this.navbarColor = 'light';
        this.isJournalPasswordSet = true;
      } else {
        this.title = "Set-up Password";
        this.navbarColor = "primary";
      }
    })
    this.initialize();
    this.database.journals.subscribe(res => this.journals = res.sort((a, b) => b.doc.date -  a.doc.date ) );
  }
  createEntry() {
    const modal = this.modal.create(SelectEmotionPage);
    modal.present();
  }
  createJournal(){
    const modal = this.modal.create(JournalActionPage, {action: 'Create Journal'});
    modal.present();
    modal.onDidDismiss(isChanges => {
      if(isChanges) {
        this.initialize();
      }
    })
  }
  readJournal(journal){
    const modal = this.modal.create(JournalActionPage, {action: this.formatDate(journal.doc.date), journal: journal});
    modal.present();
    modal.onDidDismiss(isChanges=> {
      if(isChanges) {
        this.initialize();
      }
    })
  }
  formatDate(timestamp) {
    return moment(timestamp).format("DD MMMM YYYY");
  }
  formatTime(timestamp) {
    return moment(timestamp).format('hh:mm A');
  }
  initialize() {
    this.database.getAllDocs().then(res => {
      const rows: Array<any> = res.rows;
      this.journals = rows.filter(row => row.doc.type === 'journal');
      console.log(this.journals);
      this.database.journalsSource.next(this.journals);
    })
  }

  submitPassword() {
   
    if(this.password === this.confirmpassword && this.password && this.confirmpassword) {
      this.user.password = this.password;
      this.database.createJournalPassword(this.user).then(res => {
        console.log(res);
        this.isJournalPasswordSet = true;
        this.password = '';
        this.presentToast('Password set up successfully')
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

  verifiyPassword(){
    if(this.password === this.user.password) {
      this.isJournalPasswordSet = true;
      this.isLogin = true;
      this.navbarColor = 'light';
      this.title = 'My Journal';
    } else {
      this.presentToast('Invalid Credential');
    }
  }
  changePassword(){
    const modal = this.modal.create(ChangePasswordPage, {user: this.user});
    modal.present();
    modal.onDidDismiss(hasChanges => {
     if(hasChanges) {
      this.isLogin = false;
     }
    })
  }
}   
