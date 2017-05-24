import { UserService } from './../../services/user.service';
import { Component, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Content, PopoverController, ToastController } from 'ionic-angular';
import { CauseDetails } from '../cause-details/cause-details';
import { Keyboard } from '@ionic-native/keyboard';
import { CauseService } from "../../services/causes.service";
import { PopoverPage } from './popover.component';

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
  empty: Boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private zone: NgZone,
    private causeService: CauseService,
    public popoverCtrl: PopoverController,
    private userService: UserService,
    private keyboard: Keyboard,
    private toastCtrl: ToastController, ) {
    this.getCauses();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CausesPage');
  }

  gotocause_details(id) {

    let profileModal = this.modalCtrl.create(CauseDetails, { causeId: id });

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

  onInput(input) {
    this.getCauses();
    this.keyboard.close();
  }
  onCancel() {

  }


  getCauses(update = false, infiniteScroll = null, ref = null) {


    this.busy = true;
    let user_id = this.userService.id;


    this.causeService.getCauses(this.page, user_id, this.filter, this.searchText)
      .subscribe((data: any) => {
        this.zone.run(() => {
          if (update) {
            data.data.docs.map((obj) => {
              this.causes.push(obj);
            });
            infiniteScroll.complete();
          } else {
            this.causes = data.data.docs;
            this.totalPages = data.data.pages;
            this.showSubHeader = true;
            if (this.causes.length === 0) {
              this.empty = true;
              let toast = this.toastCtrl.create({
                message: `Sorry! No results found!`,
                duration: 3000,
                position: 'bottom'
              });
              toast.present();
            } else {
              this.empty = false;
            }
          }

          if (this.page === this.totalPages) {
            this.showInfiniteScroll = false;
          } else {
            this.showInfiniteScroll = true;
          }

          if (ref)
            ref.complete();
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
      if (data) {
        if (this.filter !== data) {
          this.filter = data;
          this.page = 1;
          this.getCauses();
        }
      }
    });
  }

  dorefresh(refresher) {
    this.page = 1;
    this.getCauses(false, null, refresher);
  }

}
