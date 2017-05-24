import { Slides } from './../slides/slides';
import { UPDATE_USER } from './../../reducers/user.reducer';
import { UserService } from './../../services/user.service';
import { SideMenu } from './../side-menu/side-menu';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { GoogleAuth, User, FacebookAuth, Auth } from '@ionic/cloud-angular';
import { Storage } from '@ionic/storage';


export class NativeUser {
  constructor(
    public name: string,
    public picture: string,
    public uuid: string,
    public email: string,
    public points: number = 0
  ) { }
}

@IonicPage()
@Component({
  selector: 'page-login-page',
  templateUrl: 'login-page.html',
})

export class LoginPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public googleAuth: GoogleAuth,
    public user: User,
    public facebookAuth: FacebookAuth,
    private storage: Storage,
    private alertCtrl: AlertController,
    private userService: UserService,
    private auth: Auth,
    public loadingCtrl: LoadingController) {
    this.auth.logout();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  doLogin() {
    this.navCtrl.setRoot(Slides, {}, { animate: true, direction: 'forward' });
  }


  facebook() {
    this.facebookAuth.login().then((data) => {
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });

      loading.present();

      if (data.signup) {
        this.userService.saveUser({
          name: this.user.social.facebook.data.full_name,
          email: this.user.social.facebook.data.email,
          img: this.user.social.facebook.data.profile_picture,
          facebook: this.user.social.facebook.uid
        }).subscribe((data: any) => {
          this.userService.dispatch(UPDATE_USER, data.data);
          this.user.set('id', data.data._id);
          this.user.save();
          alert(JSON.stringify(data.data._id));
          loading.dismiss();
          this.doLogin();
        });
      } else {
        this.userService.getUser(this.user.get('id', null))
          .subscribe((data: any) => {
            this.userService.dispatch(UPDATE_USER, data.user);
            loading.dismiss();
            this.doLogin();
          });
      }
    }, this.errHandler);
  }

  google() {
    this.googleAuth.login().then((data) => {

      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });

      loading.present();
      if (data.signup) {
        this.userService.saveUser({
          name: this.user.social.google.data.full_name,
          email: this.user.social.google.data.email,
          img: this.user.social.google.data.profile_picture,
          google: this.user.social.google.uid
        }).subscribe((data: any) => {
          this.userService.dispatch(UPDATE_USER, data.data);
          this.user.set('id', data.data._id);
          this.user.save();
          loading.dismiss();
          this.doLogin();
        });
      } else {
        this.userService.getUser(this.user.get('id', null))
          .subscribe((data: any) => {
            this.userService.dispatch(UPDATE_USER, data.user);
            loading.dismiss();
            this.doLogin();
          });
      }
    }, this.errHandler.bind(this));
  }

  errHandler(data) {
    console.log('**** ERROR *****');
    console.log(JSON.stringify(data));
    // let alert = this.alertCtrl.create({
    //   title: 'Invalid Login',
    //   subTitle: data,
    //   buttons: ['Dismiss']
    // });
    // alert.present();
    alert(JSON.stringify(data));

  }

  testlogin() {
    this.doLogin();
  }
}

// test Data
// const fbLogin = {
//   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5MDQ2MmVmNi04OTAwLTQxMjUtOGYyNy00NGE3NTExNzZkZTcifQ.vBZYLzDHGxxB95m2q01y9CSnYbZbsfveIeXEWHPWWcA",
//   "signup": false
// }

// const fbUser = {
//   "uid": "10213224138460849",
//   "data":
//   {
//     "email": "nileshjayanandana@yahoo.com",
//     "profile_picture": "https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/13906904_10210387323542249_3331820178298643532_n.jpg?oh=544be5cd948e81867d801b42768e08fc&oe=59C27F18",
//     "raw_data": {
//       "email": "nileshjayanandana@yahoo.com",
//       "id": "10213224138460849",
//       "first_name": "Nilesh",
//       "picture": {
//         "data":
//         {
//           "is_silhouette": false,
//           "url": "https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/13906904_10210387323542249_3331820178298643532_n.jpg?oh=544be5cd948e81867d801b42768e08fc&oe=59C27F18"
//         }
//       },
//       "name": "Nilesh Jayanandana", "last_name": "Jayanandana"
//     },
//     "username": null,
//     "full_name": "Nilesh Jayanandana"
//   }
// }
