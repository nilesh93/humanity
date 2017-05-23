import { UserService } from './../../services/user.service';
import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


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
  }

  load(ref = null, update = false, infiniteScroll = null) {
    this.userService.leaderboards(this.page)
      .subscribe((data: any) => {
        this.zone.run(() => {
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
          } else {
            this.showInfiniteScroll = true;
          }

          if (ref) {
            ref.complete();
          }
        });
      });
  }

  reload(refresher) {
    this.page = 1;
    this.load(refresher);
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
