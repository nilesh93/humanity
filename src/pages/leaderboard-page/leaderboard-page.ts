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
  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserService,
    private zone: NgZone) {
      this.load();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeaderboardPage');
  }

  load(ref=null) {
    this.userService.leaderboards()
      .subscribe((data) => {
        this.zone.run(() => {
          this.leaderboard = data;

          if(ref){
            ref.complete(); 
          }
        });
      });
  }
}
