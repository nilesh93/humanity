import { LazyLoadImageModule } from 'ng2-lazyload-image';
import { IonicImageLoader } from 'ionic-image-loader';
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
    IonicImageLoader,
    LazyLoadImageModule
  ],
  exports: [
    CausesPage,
    PopoverPage
  ],
  entryComponents: [PopoverPage]
})
export class CausesPageModule { }
