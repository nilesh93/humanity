import { UserService } from './../../services/user.service';
import { DonationService } from './../../services/donation.service';
import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DonationsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-donations-page',
  templateUrl: 'donations-page.html',
})
export class DonationsPage {

  page: number = 1;
  donations: Array<any> = [];
  showInfiniteScroll: Boolean = true;
  busy: Boolean = false;
  totalPages: number;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private donationService: DonationService, private userService: UserService, private zone: NgZone) {
    this.load();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DonationsPage');
  }


  extractLetterss(title) {
    let arr = title.split(' ');
    return arr[0].split('')[0] + arr[1].split('')[0];
  }

  load(update = false, infiniteScroll = null) {
    this.busy = true;
    this.donationService.getDonationHistory(this.userService.id, this.page)
      .subscribe((data) => {

        this.zone.run(() => {
          if (update) {
            data.docs.map((obj) => {
              this.donations.push(obj);
            });
            infiniteScroll.complete();
          } else {
            this.donations = data.docs;
            this.totalPages = data.pages;
          }

          if (this.page === this.totalPages) {
            this.showInfiniteScroll = false;
          }
          this.busy = false;
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
      this.load(true, infiniteScroll);
    } else {
      infiniteScroll.complete();
    }
  }

}