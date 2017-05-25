import { ADD_POINTS } from './../../reducers/user.reducer';
import { UserService } from './../../services/user.service';
import { AdvertisementService } from './../../services/advertisement.service';
import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, LoadingController } from 'ionic-angular';
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
    public loadingCtrl: LoadingController,
    private fb: Facebook) {

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    this.id = this.navParams.get('addId');
    this.getAdd(loading);

    // this.fb.login(['public_profile', 'user_friends', 'email'])
    //   .then((res: FacebookLoginResponse) => console.log('Logged into Facebook!', res))
    //   .catch(e => console.log('Error logging into Facebook', e));

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
}
