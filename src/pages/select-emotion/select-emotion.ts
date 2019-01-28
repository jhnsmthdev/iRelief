import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SelectActivitiesPage } from '../select-activities/select-activities';
import { DatabaseProvider } from '../../providers/database/database';
import { Entry } from '../../model/entry';

/**
 * Generated class for the SelectEmotionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-select-emotion',
  templateUrl: 'select-emotion.html',
})
export class SelectEmotionPage {
  // entry: Entry = {
  //   emotion: 'Fear',
  //   activities: ['Gaming'],
  //   note: 'Test note',
  //   date: 1
  // }  
  entries: Array<Entry>;
  hasEmotionSelected: Boolean;
  emotionSelected: String;
  constructor(public navCtrl: NavController, public navParams: NavParams, public database: DatabaseProvider) {
    // this.database.createEntriesDatabase().then((res) => {
    //   console.log(res, 'the database exists.')
    // })
    this.database.getAllDocs().then(res => {
      console.log(res);
      const rows: Array<any> = res.rows;
      this.entries = rows.filter((row) => row.doc.type === 'entry');
      console.log(this.entries)
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectEmotionPage');
  }
  selectEmotion(emotion:String, event) {
    // let imageUrl: String = event.target.src;
    // event.target.src = imageUrl.replace('.png' , '_selected.png');
    this.emotionSelected = emotion;
    this.hasEmotionSelected = true;
  }
  goToSelectAcitivities() {
    this.navCtrl.push(SelectActivitiesPage,{emotion: this.emotionSelected});
  }

}
