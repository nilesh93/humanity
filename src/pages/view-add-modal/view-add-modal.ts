import { UserService } from './../../services/user.service';
import { AdvertisementService } from './../../services/advertisement.service';
import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, LoadingController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-view-add-modal',
  templateUrl: 'view-add-modal.html',
})
export class ViewAddModal {


  id: String = '';
  advert: any = {};
  videoUrl: string = null;
  imgUrl: string = null;
  available = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
    private advertisementService: AdvertisementService, private zone: NgZone, private userService: UserService,
    private toastCtrl: ToastController, public loadingCtrl: LoadingController) {

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    this.id = this.navParams.get('addId');
    this.advertisementService.viewAdvertisement(this.id, this.userService.id)
      .subscribe((data) => {
        this.zone.run(() => {

          this.imgUrl = data.add._company.img;
          this.videoUrl = data.add.video_url || null;
          this.advert = data.add;
          this.available = data.availability;
          loading.dismiss();

        });
      });
  }

  ionViewDidLoad() {

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  onPlayEnd() {
    this.advertisementService.advertisementPlayed(this.id, {
      id: this.userService.id
    })
      .subscribe((data) => {
        if (data.status) {
          let toast = this.toastCtrl.create({
            message: `Earned ${this.advert.price_per_view} Points!`,
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        }
      });
  }
}
