import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectEmotionPage } from './select-emotion';

@NgModule({
  declarations: [
    SelectEmotionPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectEmotionPage),
  ],
})
export class SelectEmotionPageModule {}
