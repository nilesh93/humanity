import { SideMenu } from './../side-menu/side-menu';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the Slides page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-slides',
  templateUrl: 'slides.html',
})
export class Slides {

  fromLogin: boolean = false;
  slides = [
    {
      title: "Welcome to Humanity!",
      description: "<b>Humanity</b> showcases a number of advertisments and causes where you have the power to earn and donate for a cause in need.",
      image: "assets/img/ica-slidebox-img-1.png",
    },
    {
      title: "How do I earn points?",
      description: "<b>Humanity</b> has an option called earn cause points in the sidebar which provides a list of advertisements which you can watch and earn ",
      image: "assets/img/ica-slidebox-img-2.png",
    },
    {
      title: "How do I donate?",
      description: "<b>Humanity </b> causes allow you to donate the points you have earned for a good cause. Simply press donate at the bootom of the screen",
      image: "assets/img/ica-slidebox-img-3.png",
    }
  ];
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.fromLogin = (this.navParams.get('fromMenu')) ? false : true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Slides');
  }

  navigate() {
    if (this.fromLogin) {
      this.navCtrl.setRoot(SideMenu, {}, { animate: true, direction: 'forward' });
    } else {
      this.dismiss();
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
