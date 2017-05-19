import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import {CauseDetails} from '../cause-details/cause-details';
import {DonatePage} from '../donate-page/donate-page';
/**
 * Generated class for the CausesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-causes-page',
  templateUrl: 'causes-page.html',
})
export class CausesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,  public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CausesPage');
  }

  gotocause_details(){
    
    let profileModal = this.modalCtrl.create(CauseDetails, { causeId: 1234567 });

    profileModal.present();
  }

  gotodonate_page(){
    let profileModal = this.modalCtrl.create(DonatePage, { donateId: 1234567 });

    profileModal.present();
  }

}
