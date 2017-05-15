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

import { MyApp } from './app.component';
import { SideMenu } from '../pages/side-menu/side-menu';
import { CauseDetailsModule } from '../pages/cause-details/cause-details.module';
import { DonatePageModule } from '../pages/donate-page/donate-page.module';
import { DonationsPageModule } from "../pages/donations-page/donations-page.module";

@NgModule({
  declarations: [
    MyApp,
    SideMenu

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      mode: 'md'
    }),
 
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
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
