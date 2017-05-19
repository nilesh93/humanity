import { PopoverPage } from './popover.component';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CausesPage } from './causes-page';

@NgModule({
  declarations: [
    CausesPage,
    PopoverPage
  ],
  imports: [
    IonicPageModule.forChild(CausesPage),
  ],
  exports: [
    CausesPage,
    PopoverPage
  ],
  entryComponents:[PopoverPage]
})
export class CausesPageModule { }
