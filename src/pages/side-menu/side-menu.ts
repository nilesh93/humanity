import { LeaderboardPage } from './../leaderboard-page/leaderboard-page';
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
  notification: boolean = false;
  constructor(public navCtrl: NavController) {
    this.sideBarPage = Tabs;
  }

  navigate(value) {
    switch (value) {
      case 'Home':
        this.sideBarPage = Tabs;
        break;
      case 'Leaderboard':
        this.sideBarPage = LeaderboardPage;
        break;
    }
  }

}
