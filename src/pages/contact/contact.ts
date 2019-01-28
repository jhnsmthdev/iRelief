import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { SelectEmotionPage } from '../select-emotion/select-emotion';
import { JournalActionPage } from '../journal-action/journal-action';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController, public modal: ModalController) {

  }
  createEntry() {
    const modal = this.modal.create(SelectEmotionPage);
    modal.present();
  }
  createJournal(){
    const modal = this.modal.create(JournalActionPage, {action: 'Create Journal'});
    modal.present();
  }
  
}
