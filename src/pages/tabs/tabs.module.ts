import { NgModule } from '@angular/core';
import { IonicModule, IonicPageModule } from 'ionic-angular';
import { Tabs } from './tabs';

@NgModule({
  declarations: [
    Tabs,
  ],
  imports: [
    IonicPageModule.forChild(Tabs),
  ],
  exports: [
    Tabs
  ]
})
export class TabsModule { }
