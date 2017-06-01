import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { ADD_POINTS } from './../../reducers/user.reducer';
import { UserService } from './../../services/user.service';
import { AdvertisementService } from './../../services/advertisement.service';
import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';

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

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private advertisementService: AdvertisementService,
    private zone: NgZone, private userService: UserService,
    private toastCtrl: ToastController,
    private spinnerDialog: SpinnerDialog,
    private streamingMedia: StreamingMedia,
    private fb: Facebook) {

    this.spinnerDialog.show();

    this.id = this.navParams.get('addId');
    this.getAdd(true);

  }

  getAdd(loading = null) {
    this.advertisementService.viewAdvertisement(this.id, this.userService.id)
      .subscribe((data: any) => {
        this.zone.run(() => {

          this.imgUrl = data.add._company.img;
          this.videoUrl = data.add.video_url || null;
          this.advert = data.add;
          this.available = data.availability;
          if (loading)
            this.spinnerDialog.hide();

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
      .subscribe((data: any) => {
        if (data.status) {
          this.userService.dispatch(ADD_POINTS, this.advert.price_per_view);
          this.getAdd();
          let toast = this.toastCtrl.create({
            message: `Earned ${this.advert.price_per_view} Points!`,
            duration: 3000,
            position: 'bottom'
          });
          toast.present();

        }
      });
  }

  watchVideo() {
    let options: StreamingVideoOptions = {
      successCallback: () => {
        this.onPlayEnd();
      },
      errorCallback: (e) => { console.log('Error streaming') },
      orientation: 'landscape'
    };
    this.streamingMedia.playVideo(this.videoUrl, options);
  }
}
