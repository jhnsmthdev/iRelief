import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import moment from "moment";
import { DatabaseProvider } from '../../providers/database/database';
import { Journal } from '../../model/journal';

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
  journal: Journal = {
    title: undefined,
    content: undefined,
  }
  textBtnLeft: String = 'CANCEL';
  textBtnRight: String = 'SAVE';

  constructor(public navCtrl: NavController, public navParams: NavParams, public database: DatabaseProvider, public toast: ToastController, public view: ViewController) {
    this.action = this.navParams.get('action');
 
    // const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // const testDateUtc = moment.utc( moment().tz(timezone).format());
    // const localDate = moment(testDateUtc).local();
    // this.CurrentTime=   moment().tz(timezone).format();
    // console.log(moment().format('hh:mm A') )
    // const a = moment(new Date().getTime()).format("DD MMMM YYYY");
    // console.log(a)'
  
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JournalActionPage');
    if(this.navParams.get('journal')) {
      this.journal = this.navParams.get('journal').doc;
      this.textBtnLeft = 'BACK';
      this.textBtnRight = 'EDIT';
    } else {
      const titleELement = document.getElementById('title');
      const contentElement = document.getElementById('content');
      titleELement.removeAttribute('readonly');
      contentElement.removeAttribute('readonly');
    }
  }
 
  getTime(){
    let date: any = this.journal.date;
    return moment(date).format('hh:mm A') ;
  }
  doAction(action) {
    if(action === 'SAVE') {
     if(this.journal.date) {
        this.updateJournal();
     } else {
       this.insertJournal();
     }
    } else if(action === 'EDIT') {
      this.editJournal();
    } else if(action === 'DELETE') {
      this.deleteJournal();
    }
     else {
      this.cancel();
    }
    // else if(action === 'Cancel' || action === 'Back') {
    //   this.cancel();
    // } 
  }
  insertJournal(){
    this.database.insertJournal(this.journal).then(res => {
      console.log(res);
      let toast = this.toast.create({
        message: 'Successfully added new journal',
        duration: 3000
      });
      toast.present();
      this.database.refreshJournal();
      this.view.dismiss();
    }).catch(err => {
      alert('Error: ' + err);
    })
  }
  cancel(){
    this.view.dismiss(false);
  }
  editJournal(){
    const titleELement = document.getElementById('title');
    const contentElement = document.getElementById('content');
    titleELement.removeAttribute('readonly');
    contentElement.removeAttribute('readonly');
    this.textBtnLeft = 'DELETE';
    this.textBtnRight = 'SAVE';
  }
  updateJournal(){
    this.database.updateJournal(this.journal).then(res => {
      console.log(res);
      let toast = this.toast.create({
        message: 'Successfully updated journal',
        duration: 3000
      });
      toast.present();
      this.view.dismiss(true);
    })
  }
  deleteJournal(){
    this.database.deleteJournal(this.journal._id ,this.journal._rev).then(res => {
      console.log(res);
      let toast = this.toast.create({
        message: 'Successfully deleted journal',
        duration: 3000
      });
      toast.present();
      this.view.dismiss(true);
    })
  }

}
