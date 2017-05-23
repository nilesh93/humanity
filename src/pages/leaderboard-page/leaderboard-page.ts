import { UserService } from './../../services/user.service';
import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LeaderboardPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-leaderboard-page',
  templateUrl: 'leaderboard-page.html',
})
export class LeaderboardPage {

  leaderboard: Array<any> = [];
  page: number = 1;
  busy: Boolean = false;
  totalPages: number;
  showInfiniteScroll: Boolean = true;
  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserService,
    private zone: NgZone) {
    this.load();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeaderboardPage');
  }

  load(ref = null, update = false, infiniteScroll = null) {
    this.userService.leaderboards()
      .subscribe((data: any) => {
        this.zone.run(() => {
          this.leaderboard = data.docs;

          if (update) {
            data.docs.map((obj) => {
              this.leaderboard.push(obj);
            });
            infiniteScroll.complete();
          } else {
            this.leaderboard = data.docs;
            this.totalPages = data.pages;
          }
          if (this.page === this.totalPages) {
            this.showInfiniteScroll = false;
          }

          if (ref) {
            ref.complete();
          }
        });
      });
  }


  lazyLoad(infiniteScroll) {
    if (this.busy) {
      infiniteScroll.complete();
      return false;
    }
    this.page++;
    if (this.page > this.totalPages) {
      infiniteScroll.complete();
      this.page--;
      return false;
    }

    // check direction
    if (infiniteScroll._content.directionY == 'down') {
      this.load(null, true, infiniteScroll);
    } else {
      infiniteScroll.complete();
    }
  }
}
