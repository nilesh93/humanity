import { AdvertisementService } from './../../services/advertisement.service';
import { ViewAddModal } from './../view-add-modal/view-add-modal';
import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-adds-page',
  templateUrl: 'adds-page.html',
})
export class AddsPage {

  adds: Array<any> = [];
  page: number = 1;
  busy: Boolean = false;
  totalPages: number;
  showInfiniteScroll: Boolean = true;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private advertisementService: AdvertisementService,
    private zone: NgZone) {

    this.getAdds();
  }

  ionViewDidLoad() {

  }

  doRefresh(refresher) {
    this.page = 1;
    this.getAdds(refresher);
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
      this.getAdds(null, true, infiniteScroll);
    } else {
      infiniteScroll.complete();
    }
  }

  public viewAdd(id) {

    let profileModal = this.modalCtrl.create(ViewAddModal, { userId: 8675309, bool: true, addId: id });
    profileModal.present();
  }


  getAdds(ref = null, update = false, infiniteScroll = null) {
    this.busy = true;
    this.advertisementService.getAdvertisements(this.page)
      .subscribe((data: any) => {
        this.zone.run(() => {
          if (update) {
            data.data.docs.map((obj) => {
              this.adds.push(obj);
            });
            infiniteScroll.complete();
          } else {
            this.adds = data.data.docs;

          }
          this.totalPages = data.data.pages;
          if (this.page === this.totalPages) {
            this.showInfiniteScroll = false;
          } else {
            this.showInfiniteScroll = true;
          }
          if (ref)

            ref.complete();
        });
        this.busy = false;
      });
  }


}
