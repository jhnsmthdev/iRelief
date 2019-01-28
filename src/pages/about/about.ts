import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { Entry } from '../../model/entry';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  name: String = '';
  entries: Array<Entry> = [];
  constructor(public navCtrl: NavController, public database: DatabaseProvider, public alert: AlertController) {
    this.database.getAllDocs().then(res => {
      const rows: Array<any> = res.rows;
      this.name = rows.filter(row => row.doc.type === 'user')[0].doc.name;
    })  
    this.database.getAllDocs().then(res => {
      const rows: Array<any> = res.rows;
      this.entries = rows.filter(row => row.doc.type === 'entry').reverse();
      console.log(this.entries)
    })  
  }
 async deleteEntry(id , rev) {
    const alert = await this.alert.create({
      message: 'Are you sure you want to <strong>delete?</strong>',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.database.deleteEntry(id , rev).then(res => {
              console.log(res);
            })
          }
        }
      ]
    });

    await alert.present();
  }

}
