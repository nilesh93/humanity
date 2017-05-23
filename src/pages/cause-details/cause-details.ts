import { UserService } from './../../services/user.service';
import { CauseService } from './../../services/causes.service';
import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, ToastController } from 'ionic-angular';

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

  causeId: any;
  details: any;
  img: any = '';
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
    private causeService: CauseService, private zone: NgZone, public alertCtrl: AlertController,
    private toastCtrl: ToastController, private userService: UserService) {
    this.causeId = this.navParams.get('causeId');

    this.causeService.viewCauses(this.causeId)
      .subscribe((data) => {
        this.zone.run(() => {
          this.img = data.img;
          this.details = data;
          console.log(this.details);
        });

      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CauseDetails');
    console.log(this.userService.amount);
  }
  dismiss() {
    //
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
            console.log('Saved clicked', data);
            let msg = '';
            if (data.amount == parseFloat(data.amount)) {

              if (data.amount <= this.userService.amount) {

                this.causeService.donate(this.causeId, {
                  amount: data.amount,
                  user_id: this.userService.id
                }).subscribe((payload) => {
                  this.showToast(`Successfully Donated Rs ${data.amount}`, false);
                  this.userService.amount = payload.user.points;
                  this.details = payload.cause;
                }, (err) => {
                  this.showToast('Something went wrong', true);
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

}
