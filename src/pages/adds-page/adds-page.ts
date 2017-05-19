import { AdvertisementService } from './../../services/advertisement.service';
import { ViewAddModal } from './../view-add-modal/view-add-modal';
import { Component, NgZone } from '@angular/core';
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

  adds: Array<any> = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,
    private advertisementService: AdvertisementService, private zone: NgZone) {
    this.getAdds();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddsPage');
  }

  doRefresh(refresher) {
    this.getAdds(refresher);
  }

  


  public viewAdd(id) {

    let profileModal = this.modalCtrl.create(ViewAddModal, { userId: 8675309, bool: true, addId: id });
    profileModal.present();
  }


  getAdds(ref = null) {
    this.advertisementService.getAdvertisements()
      .subscribe((data) => {
        this.zone.run(() => {
          this.adds = data.data;
          if (ref)
            ref.complete();
        });
      });
  }

 
}
