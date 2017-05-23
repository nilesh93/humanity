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
  page: number = 1;
  totalPages: any;
  busy: Boolean = false;
  showInfiniteScroll: Boolean = true;


  defaultImage = 'https://www.placecage.com/1000/1000';
  image = 'https://images.unsplash.com/photo-1443890923422-7819ed4101c0?fm=jpg';
  offset = 100;
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


  getCauses(update = false, infiniteScroll = null) {


    this.busy = true;

    this.causeService.getCauses(this.page)
      .subscribe((data) => {
        this.zone.run(() => {
          if (update) {
            data.data.docs.map((obj) => {
              this.causes.push(obj);
            });
            infiniteScroll.complete();
          } else {
            this.causes = data.data.docs;
            this.totalPages = data.data.pages;
          }

          if (this.page === this.totalPages) {
            this.showInfiniteScroll = false;
          }
          this.busy = false;
        });
      });
  }

  lazyLoad(infiniteScroll) {
    if (this.busy) {
      infiniteScroll.complete();
      return false;
    }
    this.page++;
    if (this.page > this.totalPages) {
      infiniteScroll.complete();
      this.page--;
      return false;
    }

    // check direction
    if (infiniteScroll._content.directionY == 'down') {
      this.getCauses(true, infiniteScroll);
    } else {
      infiniteScroll.complete();
    }
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
