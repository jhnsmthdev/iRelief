import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { ReadAdvicesPage } from '../read-advices/read-advices';
import { YoutubePipe } from '../../pipes/youtube/youtube';
import { JournalActionPage } from '../journal-action/journal-action';
import { SelectEmotionPage } from '../select-emotion/select-emotion';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  advices: Object;
  motivations: Object;
  stretchMuscles: Object;
  relax: Object;
  videos: Object;
  musics: Object;

  constructor(public navCtrl: NavController, public database: DatabaseProvider, public modal: ModalController) {
    this.database.advices.subscribe(res => {
     this.advices = res[this.database.selectedEmotion.toLowerCase()] || [];
     console.log(this.advices);
    })
    this.database.motivations.subscribe(res => {
      this.motivations = res[this.database.selectedEmotion.toLowerCase()] || [];
      console.log(this.motivations);
     })
     this.database.strecthMuscles.subscribe(res => {
       console.log('res',res );
      this.stretchMuscles = res[this.database.selectedEmotion.toLowerCase()] || [];
      console.log(this.stretchMuscles);
     })
     this.database.relax.subscribe(res => {
      this.relax = res[this.database.selectedEmotion.toLowerCase()] || [];
      console.log(this.relax);
     })
     this.database.videos.subscribe(res => {
      this.videos = res[this.database.selectedEmotion.toLowerCase()] || [];
      console.log(this.videos);
     })
     this.database.musics.subscribe(res => {
      this.musics = res[this.database.selectedEmotion.toLowerCase()] || [];
      console.log(this.videos);
     })
  }

  goToReadAdvices() {
   const modal = this.database.createModal(ReadAdvicesPage, {data: this.advices, type: "READ ADVICES"});
   modal.present();
  }
  goToMotivateYourSelf() {
    const modal = this.database.createModal(ReadAdvicesPage, {data: this.motivations, type: 'MOTIVATE YOUR SELF'});
    modal.present();
   }
   goToStretchYourMuscles() {
    const modal = this.database.createModal(ReadAdvicesPage, {data: this.stretchMuscles , type: 'STRETCH YOUR MUSCLES'});
    modal.present();
   }
   goToRelax() {
     const modal = this.database.createModal(ReadAdvicesPage, {data: this.relax, type: 'RELAX'});
     modal.present();
  }
  goToWachVideos() {
    const modal = this.database.createModal(ReadAdvicesPage, {data: this.videos, type: 'WATCH MOTIVATIONAL'});
    modal.present();
  }
 goToListenMusics() {
  const modal = this.database.createModal(ReadAdvicesPage, {data: this.musics, type: 'LISTEN TO MUSIC'});
  modal.present();
  }
  createJournal(){
    const modal = this.modal.create(JournalActionPage, {action: 'Create Journal'});
    modal.present();
    modal.onDidDismiss(isChanges => {
      if(isChanges) {
        // this.initialize();
      }
    })
  }
  createEntry() {
    const modal = this.modal.create(SelectEmotionPage);
    modal.present();
  }
}
