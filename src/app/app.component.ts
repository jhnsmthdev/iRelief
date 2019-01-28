import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SelectEmotionPage } from '../pages/select-emotion/select-emotion';
import { DatabaseProvider } from '../providers/database/database';
import { SliderPage } from '../pages/slider/slider';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any ;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, database: DatabaseProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      statusBar.backgroundColorByHexString('#8C4CFA');
      statusBar.styleLightContent();
      splashScreen.hide();
      database.createDatabase().then((res) => {
        console.log(res, 'the database exists.')
        if(res.doc_count > 0) {
          this.rootPage = SelectEmotionPage;
        } else {
          this.rootPage = SliderPage;
        }
        // The database exists.
        // Do something...
      })
      .catch(e => {
        console.log(e,'the database not exists.');
        // No database found and it was not created.
        // Do something else...
      });
    });
  }
}
