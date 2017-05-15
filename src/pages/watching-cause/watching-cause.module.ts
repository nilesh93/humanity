import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WatchingCause } from './watching-cause';

@NgModule({
  declarations: [
    WatchingCause,
  ],
  imports: [
    IonicPageModule.forChild(WatchingCause),
  ],
  exports: [
    WatchingCause
  ]
})
export class WatchingCauseModule {}
