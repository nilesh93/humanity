import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DonationsPage } from './donations-page';

@NgModule({
  declarations: [
    DonationsPage,
  ],
  imports: [
    IonicPageModule.forChild(DonationsPage),
  ],
  exports: [
    DonationsPage
  ]
})
export class DonationsPageModule {}
