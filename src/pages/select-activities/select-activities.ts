import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { Entry } from '../../model/entry';
import { DatabaseProvider } from '../../providers/database/database';

/**
 * Generated class for the SelectActivitiesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-select-activities',
  templateUrl: 'select-activities.html',
})
export class SelectActivitiesPage {

  entry: Entry;
  activities: Array<String> = [];
  note: String;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public database: DatabaseProvider,
    public toast: ToastController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectActivitiesPage');
  }
  selectActivity(activity) {
    if(this.activities.indexOf(activity) >= 0) {
      this.activities.splice(this.activities.indexOf(activity), 1);
    } else {
      this.activities.push(activity);
    }
    console.log(this.activities)
  }

  gotoTabsPage() {
    if(this.activities.length > 0 ) {
      this.entry = {
        emotion: this.navParams.get('emotion'),
        activities: this.activities,
        note: this.note,
        date: new Date().getTime()
     }
     this.database.insertEntry(this.entry).then(res => {
       console.log(res);
       this.database.currentEntryId = res.id;
       this.navCtrl.push(TabsPage, {emotion: this.navParams.get('emotion')});
     }).catch(err => {
       alert('error: ' + err);
     })
    } else {
      const toast = this.toast.create({
        message: 'Please tell me your activities',
        duration: 3000
      });
      toast.present();
    }
  }

}
