import { SUB_POINTS } from './../../reducers/user.reducer';
import { UserService } from './../../services/user.service';
import { CauseService } from './../../services/causes.service';
import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, ToastController } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';

@IonicPage()
@Component({
  selector: 'page-cause-details',
  templateUrl: 'cause-details.html',
})
export class CauseDetails {

  causeId: any;
  details: any;
  img: any = '';
  watching: Boolean = false;
  busy: Boolean = false;
  watchBusy: Boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private causeService: CauseService,
    private zone: NgZone,
    public alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private userService: UserService,
    private fb: Facebook) {

    this.causeId = this.navParams.get('causeId');

    this.causeService.viewCauses(this.causeId)
      .subscribe((data: any) => {
        this.zone.run(() => {
          this.img = data.img;
          this.details = data;
          this.watching = (data.watched_by.indexOf(this.userService.id) !== -1);
        });
      });


  }

  ionViewDidLoad() {

  }
  dismiss() {
    this.viewCtrl.dismiss();
  }


  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Donate for a Cause',
      message: "Enter donation amount",
      inputs: [
        {
          type: "tel",
          name: 'amount',
          placeholder: 'Amount'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirm',
          handler: data => {
            let msg = '';
            if (data.amount == parseFloat(data.amount)) {

              if (data.amount <= this.userService.amount && !this.busy) {

                this.busy = true;
                this.causeService.donate(this.causeId, {
                  amount: data.amount,
                  user_id: this.userService.id
                }).subscribe((payload: any) => {

                  this.showToast(`Successfully Donated Rs ${data.amount}`, false);
                  this.userService.dispatch(SUB_POINTS, data.amount);
                  this.details = payload.cause;
                  this.sharefb(data.amount);
                  this.busy = false;

                }, (err) => {
                  this.showToast('Something went wrong', true);
                  this.busy = false;
                });

              } else {
                msg = `Sorry! Your donations exceeds your app points`;
                this.showToast(msg, true);
              }
            }
            else {
              msg = `Inavlid Input! Please try again`;
              this.showToast(msg, true);
            }
          }
        }
      ]
    });
    prompt.present();
  }

  showToast(msg, close) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      showCloseButton: close

    });
    toast.present();
  }

  watch() {

    let obs = (this.watching) ? this.causeService.unwatch(this.causeId, this.userService.id) :
      this.causeService.watch(this.causeId, this.userService.id);
    if (!this.watchBusy) {
      this.watchBusy = true;
      obs.subscribe((data: any) => {
        this.showToast((this.watching) ? 'Stopped watching this cause' : 'Started Watching this cause', false);
        this.details = data.data;
        this.watching = (data.data.watched_by.indexOf(this.userService.id) !== -1);
        this.watchBusy = false;

      }, () => {
        this.watchBusy = false;
      });
    }
  }


  sharefb(rs) {
    this.fb.showDialog({
      method: 'share',
      href: `http://humanity-api.apps.reactive-solutions.com/about-us`,
      caption: `I just Donated Rs. ${rs} in Humanity!`,
      description: `${this.details.title}`,
      picture: `${this.img}`
    }).then((data) => {
       
    }, (err) => {
      
    });


  }

}
