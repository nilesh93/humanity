import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DonatePage } from './donate-page';

@NgModule({
  declarations: [
    DonatePage,
  ],
  imports: [
    IonicPageModule.forChild(DonatePage),
  ],
  exports: [
    DonatePage
  ]
})
export class DonatePageModule {}
