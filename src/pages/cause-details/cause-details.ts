import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the CauseDetails page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-cause-details',
  templateUrl: 'cause-details.html',
})
export class CauseDetails {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    console.log('courseId', this.navParams.get('courseId'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CauseDetails');
  }
  dismiss() {
//
    this.viewCtrl.dismiss();
  }

}
