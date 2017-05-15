import { Color } from 'ng2-charts';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-home-page',
  templateUrl: 'home-page.html',
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }
  // Doughnut
  public doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData: number[] = [350, 450, 100];
  public doughnutChartType: string = 'doughnut';

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }


  labels: string[] = ['Earned', 'Donated'];
  data: number[] = [350, 450];
  type: string = 'doughnut';


  colorsEmpty: Array<Color> = [];

  colorsEmptyObject: Array<Color> = [{}];

  datasets: any[] = [
    {
      data: this.data,
      backgroundColor: [
        "#BDBDBD",
        "#2196F3",

      ],
      hoverBackgroundColor: [
        "#BDBDBD",
        "#2196F3"
      ]
    }];

}
