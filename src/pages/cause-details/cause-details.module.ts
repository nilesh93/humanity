import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CauseDetails } from './cause-details';

@NgModule({
  declarations: [
    CauseDetails,
  ],
  imports: [
    IonicPageModule.forChild(CauseDetails),
  ],
  exports: [
    CauseDetails
  ]
})
export class CauseDetailsModule {}
