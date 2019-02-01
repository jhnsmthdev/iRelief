import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SelectEmotionPage } from '../pages/select-emotion/select-emotion';
import { SelectActivitiesPage } from '../pages/select-activities/select-activities';
import { DatabaseProvider } from '../providers/database/database';
import { SliderPage } from '../pages/slider/slider';
import { CreateProfilePage } from '../pages/create-profile/create-profile';
import { JournalActionPage } from '../pages/journal-action/journal-action';
import { ChangePasswordPage } from '../pages/change-password/change-password';
import { SelectEmotionPageModule } from '../pages/select-emotion/select-emotion.module';
import { SelectActivitiesPageModule } from '../pages/select-activities/select-activities.module';
import { SliderPageModule } from '../pages/slider/slider.module';
import { CreateProfilePageModule } from '../pages/create-profile/create-profile.module';
import { JournalActionPageModule } from '../pages/journal-action/journal-action.module';
import { ChangePasswordPageModule } from '../pages/change-password/change-password.module';
import { HttpClientModule } from '@angular/common/http';
import { ReadAdvicesPageModule } from '../pages/read-advices/read-advices.module';
import { ReadAdvicesPage } from '../pages/read-advices/read-advices';
import { StopWatchPageModule } from '../pages/stop-watch/stop-watch.module';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    // SelectEmotionPage,
    // SelectActivitiesPage,
    // SliderPage,
    // CreateProfilePage,
    // JournalActionPage,
    // ChangePasswordPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    SelectEmotionPageModule,
    SelectActivitiesPageModule,
    SliderPageModule,
    CreateProfilePageModule,
    JournalActionPageModule,
    ChangePasswordPageModule,
    ReadAdvicesPageModule,
    StopWatchPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    SelectEmotionPage,
    SelectActivitiesPage,
    SliderPage,
    CreateProfilePage,
    JournalActionPage,
    ChangePasswordPage,
    ReadAdvicesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider
  ]
})
export class AppModule {}
