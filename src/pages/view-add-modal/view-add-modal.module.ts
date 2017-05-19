import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewAddModal } from './view-add-modal';

@NgModule({
  declarations: [
    ViewAddModal,
  ],
  imports: [
    IonicPageModule.forChild(ViewAddModal),
  ],
  exports: [
    ViewAddModal
  ]
})
export class ViewAddModalModule { }
