import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { CreateProfilePage } from '../create-profile/create-profile';

/**
 * Generated class for the SliderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-slider',
  templateUrl: 'slider.html',
})
export class SliderPage {
  slideOpts = {
    effect: 'flip'
  };

  isReachEnd: Boolean;
  @ViewChild('slides') slides: Slides;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SliderPage');
  }

  next() {
    if(this.slides.getActiveIndex() === 2) {
      this.navCtrl.setRoot(CreateProfilePage);
    } else {
      this.slides.slideNext();
    }
  }

  prev() {
    this.slides.slidePrev();
  }

  ionSlideReachEnd(){
    this.isReachEnd = true;
  }
  slideNext(){
    if(this.slides.getActiveIndex() === 3) {
      this.navCtrl.setRoot(CreateProfilePage);
    }
  }
}
