import { AdvertisementService } from './../services/advertisement.service';
import { UserService } from './../services/user.service';
import { HomePageModule } from './../pages/home-page/home-page.module';
import { WatchingCauseModule } from './../pages/watching-cause/watching-cause.module';
import { LeaderboardPageModule } from './../pages/leaderboard-page/leaderboard-page.module';
import { ViewAddModalModule } from './../pages/view-add-modal/view-add-modal.module';
import { CausesPageModule } from './../pages/causes-page/causes-page.module';
import { TabsModule } from './../pages/tabs/tabs.module';
import { AddsPageModule } from './../pages/adds-page/adds-page.module';
import { LoginPageModule } from './../pages/login-page/login-page.module';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { MyApp } from './app.component';
import { SideMenu } from '../pages/side-menu/side-menu';
import { CauseDetailsModule } from '../pages/cause-details/cause-details.module';
import { DonatePageModule } from '../pages/donate-page/donate-page.module';
import { DonationsPageModule } from "../pages/donations-page/donations-page.module";
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import { CauseService } from "../services/causes.service";

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '60be3527'
  },
  'auth': {
    'google': {
      'webClientId': '21224678271-8lj1g8mmmnha3e1v7pp74fljr1arhugr.apps.googleusercontent.com',
      'scope': []
    },
    'facebook': {
      'scope': []
    }

  }
}

@NgModule({
  declarations: [
    MyApp,
    SideMenu

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {

    }),
    CloudModule.forRoot(cloudSettings),
    IonicStorageModule.forRoot(),
    HttpModule,
    LoginPageModule,
    AddsPageModule,
    TabsModule,
    CausesPageModule,
    ViewAddModalModule,
    LeaderboardPageModule,
    CauseDetailsModule,
    DonatePageModule,
    WatchingCauseModule,
    DonationsPageModule,
    HomePageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SideMenu
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UserService,
    AdvertisementService,
    CauseService
  ]
})
export class AppModule { }
