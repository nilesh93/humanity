import { Tabs } from './../tabs/tabs';
import { AddsPage } from './../adds-page/adds-page';
import { Component, ViewChild } from '@angular/core';
import { NavController, Nav } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'side-menu.html'
})
export class SideMenu {
  @ViewChild(Nav) nav: Nav;
  sideBarPage: any;

  constructor(public navCtrl: NavController) {
    this.sideBarPage = Tabs;
  }

}
