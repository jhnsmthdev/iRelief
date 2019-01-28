import { Component } from '@angular/core';
import { NavController, AlertController, App, ModalController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { Entry } from '../../model/entry';
import { Subscription } from 'rxjs';
import { SelectEmotionPage } from '../select-emotion/select-emotion';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  name: String = '';
  entries: Array<Entry> = [];
  $subscription: Subscription;
  constructor(public navCtrl: NavController, public database: DatabaseProvider, public alert: AlertController, private app: App, public modal: ModalController) {
    console.log('entriesPage')
    this.database.getAllDocs().then(res => {
      const rows: Array<any> = res.rows;
      this.name = rows.filter(row => row.doc.type === 'user')[0].doc.name;
    })  
    this.database.getAllDocs().then(res => {
      const rows: Array<any> = res.rows;
     const entries = rows.filter(row => row.doc.type === 'entry').reverse();
     this.database.entriesSource.next(entries);
    })  
    this.$subscription = this.database.entries.subscribe(res => {
      console.log(res)
      this.entries = res;
    })
    
  }
 async deleteEntry(id , rev) {
    const alert = await this.alert.create({
      message: 'Are you sure you want to <strong>delete</strong> this entry?',
      title: 'Confirmation!',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.database.deleteEntry(id , rev).then(res => {
              this.database.getAllDocs().then(res => {
                const rows: Array<any> = res.rows;
               const entries = rows.filter(row => row.doc.type === 'entry').reverse();
               this.database.entriesSource.next(entries);
              })  
            })
          }
        }
      ]
    });

    await alert.present();
  }

  createEntry() {
    const modal = this.modal.create(SelectEmotionPage);
    modal.present();
  }
}
