import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
@Component({
    template: `
   <ion-list color="md-blue"  radio-group [(ngModel)]="filter">
     <ion-item-group>
       <ion-item-divider color="light">Filter Causes</ion-item-divider>
  <ion-item inset>
    <ion-label>All Causes</ion-label>
    <ion-radio value="All" checked></ion-radio>
  </ion-item>
  <ion-item inset>
    <ion-label>Watching</ion-label>
    <ion-radio value="Watching"></ion-radio>
  </ion-item>
   <ion-row>
   <ion-col>
   
    <button ion-button block  clear color="md-dark"  (click)="close(false)" >
        Cancel
    </button>
   </ion-col>
    <ion-col>
    
    <button ion-button block  clear color="md-dark"  (click)="close(true)" >
        Done
    </button>

    </ion-col>
   
  </ion-row>
 
  
 
  </ion-item-group>
</ion-list>
  `
})
export class PopoverPage {

    filter: String = "All";
    constructor(public viewCtrl: ViewController) {
        this.filter = this.viewCtrl.data.filter;
        console.log(this.viewCtrl.data.filter);
    }


    close(bool) {
        if (bool)
            this.viewCtrl.dismiss(this.filter);
        else
            this.viewCtrl.dismiss();
    }
}