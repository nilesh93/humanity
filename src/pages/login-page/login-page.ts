import { UserService } from './../../services/user.service';
import { SideMenu } from './../side-menu/side-menu';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { GoogleAuth, User, FacebookAuth } from '@ionic/cloud-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public googleAuth: GoogleAuth, public user: User, public facebookAuth: FacebookAuth,
    private storage: Storage,
    private alertCtrl: AlertController,
    private userService: UserService) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  doLogin() {
    this.navCtrl.setRoot(SideMenu, {}, { animate: true, direction: 'forward' });
  }


  facebook() {
    this.facebookAuth.login().then((data) => {
      console.log("****** LOGGED IN *****");
      console.log(data);
      console.log("****** USER *****");
      console.log(this.user.social.facebook);

      this.storage.set('user', new NativeUser(
        this.user.social.facebook.data.full_name,
        this.user.social.facebook.data.profile_picture,
        this.user.social.facebook.uid,
        this.user.social.facebook.data.email
      ));

      if (data.signup) {
        this.userService.saveUser({
          name: this.user.social.facebook.data.full_name,
          email: this.user.social.facebook.data.email,
          img: this.user.social.facebook.data.profile_picture,
          facebook: this.user.social.facebook.uid
        }).subscribe((data) => {
          console.log(data);
        });
      }

      this.doLogin();


    }, (data) => {
      console.log('**** ERROR *****');
      console.log(JSON.stringify(data));
      let alert = this.alertCtrl.create({
        title: 'Invalid Login',
        subTitle: data,
        buttons: ['Dismiss']
      });
      alert.present();
      this.testlogin();
    });
  }

  google() {
    this.testlogin();
    this.googleAuth.login().then((data) => {
      console.log(data);
      this.doLogin();
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
    this.testlogin();
  }

  testlogin() {
    this.storage.set('user', new NativeUser(
      'Nilesh Jayanandana',
      'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/13906904_10210387323542249_3331820178298643532_n.jpg?oh=544be5cd948e81867d801b42768e08fc&oe=59C27F18',
      '10213224138460849',
      'nileshjayanandana@yahoo.com'
    ));

    // this.userService.saveUser({
    //   name: 'Nilesh Jayanandana',
    //   img: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/13906904_10210387323542249_3331820178298643532_n.jpg?oh=544be5cd948e81867d801b42768e08fc&oe=59C27F18',
    //   email: 'nileshjayanandana@yahoo.com',
    //   facebook: '10213224138460849'
    // }).subscribe((data) => {
    //   console.log(data);
    // }, (err) => {
    //   console.log("error user save **************");
    //   console.log(JSON.stringify(err));
    //   // this.storage.set('id', );
    // });
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
