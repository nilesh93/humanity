import { UserService } from './../../services/user.service';
import { Color } from 'ng2-charts';
import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-home-page',
  templateUrl: 'home-page.html',
})
export class HomePage {

  user: any = {};
  userDetails: any = {};
  img: string = '';
  dateJoined: string = '';
  userDetailsDidLoad: Boolean = false;



  labels: string[] = ['Earned', 'Donated'];
  type: string = 'doughnut';
  colorsEmpty: Array<Color> = [];

  colorsEmptyObject: Array<Color> = [{}];

  datasets: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage,
    private userService: UserService, private zone: NgZone) {


    storage.get('user').then((val) => {
      this.user = val;
    });
    this.load();


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }


  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  load(ref = null) {
    // this.userDetailsDidLoad = false;
    this.userService.getUser()
      .subscribe((data) => {
        this.zone.run(() => {
          this.userDetails = data.user;
          this.img = data.user.img;
          this.dateJoined = data.date_join_string;

          this.datasets = [
            {
              data: [(this.userDetails.total_points + 1), (this.userDetails.total_donations + 1)],
              backgroundColor: [
                "#BDBDBD",
                "#2196F3",
              ],
              hoverBackgroundColor: [
                "#BDBDBD",
                "#2196F3"
              ]
            }
          ]
          this.userDetailsDidLoad = true;
          if(ref){
            ref.complete();
          }
        });
      });
  }

}