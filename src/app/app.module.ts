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

@NgModule({
  declarations: [
    MyApp,
    SideMenu,

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    LoginPageModule,
    AddsPageModule,
    TabsModule,
    CausesPageModule
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
