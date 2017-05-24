import { CauseDetails } from './../cause-details/cause-details';
import { UPDATE_USER } from './../../reducers/user.reducer';
import { UserService } from './../../services/user.service';
import { Color } from 'ng2-charts';
import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CauseService } from "../../services/causes.service";

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
  rank: number = 0;
  colorsEmptyObject: Array<Color> = [{}];
  datasets: any[] = [];
  causes: Array<any> = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private userService: UserService,
    private zone: NgZone,
    private causeService: CauseService,
    public modalCtrl: ModalController, ) {


    this.load();
    this.getCauses();
  }

  ionViewDidLoad() {
  }


  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  load(ref = null) {
    this.userDetailsDidLoad = false;
    this.userService.getUser()
      .subscribe((data: any) => {
        this.zone.run(() => {

          this.userService.dispatch(UPDATE_USER, data.user);


          this.userDetails = data.user;
          this.img = data.user.img;
          this.dateJoined = data.date_join_string;
          this.datasets = [
            {
              data: [(this.userDetails.total_donations + 1), (this.userDetails.total_points + 1)],
              backgroundColor: ["#BDBDBD", "#2196F3"],
              hoverBackgroundColor: ["#BDBDBD", "#2196F3"]
            }
          ];
          this.userService.amount = data.user.points;
          this.userDetailsDidLoad = true;
          if (ref) {
            ref.complete();
          }
        });
      });


    this.userService.getRank(this.userService.id)
      .subscribe((data: any) => {
        this.zone.run(() => {
          this.rank = data.rank;
          console.log(this.rank);
        });
      });


  }

  getCauses() {
    this.causeService.getCauses(1, this.userService.id, '', '')
      .subscribe((data: any) => {
        this.causes = data.data.docs.splice(0, 5);
      })
  }

  gotocause_details(id) {

    let profileModal = this.modalCtrl.create(CauseDetails, { causeId: id });

    profileModal.present();
  }
}
