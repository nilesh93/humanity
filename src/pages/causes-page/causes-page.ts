import { Component, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Content, PopoverController } from 'ionic-angular';
import { CauseDetails } from '../cause-details/cause-details';
import { DonatePage } from '../donate-page/donate-page';
import { CauseService } from "../../services/causes.service";
import { PopoverPage } from './popover.component';
/**
 * Generated class for the CausesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-causes-page',
  templateUrl: 'causes-page.html',
})
export class CausesPage {

  @ViewChild("contentRef") contentHandle: Content;
  searchText: string = '';
  showSubHeader: Boolean = true;
  causes: Array<any> = [];
  popover: any;
  filter: string = "All";

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,
    private zone: NgZone, private causeService: CauseService, public popoverCtrl: PopoverController) {
    this.getCauses();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CausesPage');
  }

  gotocause_details(id) {

    let profileModal = this.modalCtrl.create(CauseDetails, { causeId: id });

    profileModal.present();
  }

  gotodonate_page() {
    let profileModal = this.modalCtrl.create(DonatePage, { donateId: 1234567 });

    profileModal.present();
  }

  scrollingDetect(event) {
    let initial = this.showSubHeader;
    if (event.directionY == "down") {
      this.showSubHeader = false;
    } else {
      this.showSubHeader = true;
    }


    if (initial !== this.showSubHeader) {
      this.zone.run(() => {
        this.contentHandle.resize();
      });
    }

  }

  onInput() {

  }
  onCancel() {

  }


  getCauses() {
    this.causeService.getCauses()
      .subscribe((data) => {
        this.zone.run(() => {
          this.causes = data.data;
        });
      });
  }

  presentPopover(myEvent) {
    this.popover = this.popoverCtrl.create(PopoverPage, { filter: this.filter });
    this.popover.present({
      ev: myEvent
    });

    this.popover.onDidDismiss((data) => {
      console.log('dissmissed', data);
    });
  }

}
