import { HomePage } from './../home-page/home-page';
import { DonationsPage } from './../donations-page/donations-page';
import { LeaderboardPage } from './../leaderboard-page/leaderboard-page';
// import { Tabs } from './../tabs/tabs';
import { AddsPage } from './../adds-page/adds-page';
import { Component, ViewChild } from '@angular/core';
import { NavController, Nav } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CausesPage } from "../causes-page/causes-page";

@Component({
  selector: 'page-home',
  templateUrl: 'side-menu.html'
})
export class SideMenu {

  @ViewChild(Nav) nav: Nav;
  sideBarPage: any;
  notification: boolean = false;
  user: any = {};

  constructor(public navCtrl: NavController, private storage: Storage) {
    this.sideBarPage = HomePage;
    storage.get('user').then((val) => {
      this.user = val;
    });
  }

  navigate(value) {
    switch (value) {
      case 'Home':
        this.sideBarPage = HomePage;
        break;
      case 'Advertisments':
        this.sideBarPage = AddsPage;
        break;
      case 'Leaderboard':
        this.sideBarPage = LeaderboardPage;
        break;
      case 'Causes':
        this.sideBarPage = CausesPage;
        break;
      case 'Donations':
        this.sideBarPage = DonationsPage;
        break;
    }
  }

}
