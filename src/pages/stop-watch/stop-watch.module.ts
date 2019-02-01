import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StopWatchPage } from './stop-watch';

@NgModule({
  declarations: [
    StopWatchPage,
  ],
  imports: [
    IonicPageModule.forChild(StopWatchPage),
  ],
})
export class StopWatchPageModule {}
