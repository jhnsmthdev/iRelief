import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReadAdvicesPage } from './read-advices';

@NgModule({
  declarations: [
    ReadAdvicesPage,
  ],
  imports: [
    IonicPageModule.forChild(ReadAdvicesPage),
  ],
})
export class ReadAdvicesPageModule {}
