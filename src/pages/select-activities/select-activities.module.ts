import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectActivitiesPage } from './select-activities';

@NgModule({
  declarations: [
    SelectActivitiesPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectActivitiesPage),
  ],
})
export class SelectActivitiesPageModule {}
