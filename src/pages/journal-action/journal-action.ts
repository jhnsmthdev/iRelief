import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import moment from "moment";

/**
 * Generated class for the JournalActionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-journal-action',
  templateUrl: 'journal-action.html',
})
export class JournalActionPage {
  action: String = '';
  // CurrentTime;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.action = this.navParams.get('action');
    // const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // const testDateUtc = moment.utc( moment().tz(timezone).format());
    // const localDate = moment(testDateUtc).local();
    // this.CurrentTime=   moment().tz(timezone).format();
    // console.log(moment().format('hh:mm A') )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JournalActionPage');
  }
 
  get CurrentTime(){
    return moment().format('hh:mm A') ;
  }

}
