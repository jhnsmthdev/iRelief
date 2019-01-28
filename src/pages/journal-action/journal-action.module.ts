import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JournalActionPage } from './journal-action';

@NgModule({
  declarations: [
    JournalActionPage,
  ],
  imports: [
    IonicPageModule.forChild(JournalActionPage),
  ],
})
export class JournalActionPageModule {}
