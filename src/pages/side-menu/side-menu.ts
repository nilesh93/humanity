import { StatusBar } from '@ionic-native/status-bar';
import { Slides } from './../slides/slides';
import { AboutPage } from './../about/about';
import { UserState } from './../../reducers/user.reducer';
import { UserService } from './../../services/user.service';
import { HomePage } from './../home-page/home-page';
import { DonationsPage } from './../donations-page/donations-page';
import { LeaderboardPage } from './../leaderboard-page/leaderboard-page';
import { AddsPage } from './../adds-page/adds-page';
import { Component, ViewChild, NgZone } from '@angular/core';
import { NavController, Nav, ModalController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController,
    private storage: Storage,
    private userService: UserService,
    private zone: NgZone,
    public modalCtrl: ModalController,
    private statusBar: StatusBar) {
      
    statusBar.backgroundColorByHexString('#2196F3');
    this.statusBar.styleBlackOpaque();
    this.sideBarPage = HomePage;
    this.subscribe();
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
      case 'About':
        let profileModal = this.modalCtrl.create(AboutPage, {});
        profileModal.present();
        break;
      case 'Help':
        let slideModal = this.modalCtrl.create(Slides, { fromMenu: true });
        slideModal.present();
        break;
    }
  }

  /**
  * Function to subscribe the user info from the user service.
  */
  subscribe() {
    this.userService.userInfo
      .subscribe((data: UserState) => {
        this.zone.run(() => {
          this.user = data;
        });
      });
  }

}
