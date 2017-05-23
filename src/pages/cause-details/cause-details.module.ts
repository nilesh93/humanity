import { IonicImageLoader } from 'ionic-image-loader';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CauseDetails } from './cause-details';

@NgModule({
  declarations: [
    CauseDetails,
  ],
  imports: [
    IonicPageModule.forChild(CauseDetails),
    IonicImageLoader
  ],
  exports: [
    CauseDetails
  ]
})
export class CauseDetailsModule {}
