import { ViewAddModal } from './../view-add-modal/view-add-modal';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

/**
 * Generated class for the AddsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-adds-page',
  templateUrl: 'adds-page.html',
})
export class AddsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddsPage');
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  buttonClick() {
    console.log("clickerd");
  }

  
  public viewAdd(bool) {

    let profileModal = this.modalCtrl.create(ViewAddModal, { userId: 8675309, bool: bool });

    profileModal.present();
  }
}
