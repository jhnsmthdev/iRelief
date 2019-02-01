import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { DatabaseProvider } from '../../providers/database/database';
import { StopWatchPage } from '../stop-watch/stop-watch';

/**
 * Generated class for the ReadAdvicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-read-advices',
  templateUrl: 'read-advices.html',
})
export class ReadAdvicesPage {
  isYoutube: Boolean;
  title: String = '';
  datas: Array<any>
  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController, public dom: DomSanitizer, public database: DatabaseProvider) {
    this.datas = this.navParams.get('data');
    this.title = this.navParams.get('type');
    console.log(this.datas);
    if(this.title === 'WATCH MOTIVATIONAL' || this.title === "LISTEN TO MUSIC") {
      this.isYoutube = true;
    }
    if(this.title !== 'STRETCH YOUR MUSCLES'){
      this.database.insertEntryLogs( this.navParams.get('type').toLowerCase()).then(res => {
        console.log(res);
        this.database.refreshEntries();
      })
    }
  }
  formatVideo(url){
    return this.dom.bypassSecurityTrustResourceUrl(url);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReadAdvicesPage');
    if(this.isYoutube){
      this.datas.forEach((value, index) => {
        const video: any = document.getElementsByTagName('iframe')[index];
        video.src = 'https://www.youtube.com/embed/' + value;
      });
    }
  }

  gotoStopWatch(data) {
    if(this.title === 'STRETCH YOUR MUSCLES') {
      let modal = this.database.createModal(StopWatchPage, {data: data});
      modal.present();
    }
  }

}
