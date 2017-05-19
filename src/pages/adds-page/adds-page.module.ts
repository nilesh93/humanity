import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddsPage } from './adds-page';

@NgModule({
  declarations: [
    AddsPage,
  ],
  imports: [
    IonicPageModule.forChild(AddsPage),
  ],
  exports: [
    AddsPage
  ]
})
export class AddsPageModule { }
