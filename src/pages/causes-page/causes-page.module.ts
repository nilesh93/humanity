import { NgModule } from '@angular/core';
import { IonicModule, IonicPageModule } from 'ionic-angular';
import { CausesPage } from './causes-page';

@NgModule({
  declarations: [
    CausesPage,
  ],
  imports: [
    IonicPageModule.forChild(CausesPage),
  ],
  exports: [
    CausesPage
  ]
})
export class CausesPageModule {}
