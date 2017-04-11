import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ViewAddModal page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-view-add-modal',
  templateUrl: 'view-add-modal.html',
})
export class ViewAddModal {

  bool: Boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.bool = this.navParams.get('bool');
  }

  ionViewDidLoad() {
    console.log('UserId', this.navParams.get('userId'));
  }

  dismiss() {
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
  }
}
