import { UPDATE_USER } from './../reducers/user.reducer';
import { UserService } from './../services/user.service';
import { SideMenu } from './../pages/side-menu/side-menu';
import { Auth, User } from '@ionic/cloud-angular';

import { CauseDetails } from './../pages/cause-details/cause-details';
import { AboutPage } from './../pages/about/about';
import { Deeplinks } from '@ionic-native/deeplinks';
import { LoginPage } from './../pages/login-page/login-page';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private deeplinks: Deeplinks,
    private auth: Auth,
    private userService: UserService,
    public user: User) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      statusBar.styleDefault();


      if (this.auth.isAuthenticated()) {
        this.userService.getUser(this.user.get('id', null))
          .subscribe((data: any) => {
            this.userService.dispatch(UPDATE_USER, data.user);
            splashScreen.hide();
            this.rootPage = SideMenu;
          }, () => {
            splashScreen.hide();
            this.rootPage = LoginPage;
          });

      } else {
        splashScreen.hide();
        this.rootPage = LoginPage;
      }

      this.deeplinks.route({
        '/about-us': AboutPage,
        '/cause/:causeId': CauseDetails
      }).subscribe((match) => {
        // match.$route - the route we matched, which is the matched entry from the arguments to route()
        // match.$args - the args passed in the link
        // match.$link - the full link data
        console.log('Successfully matched route', match);
      }, (nomatch) => {
        // nomatch.$link - the full link data

        console.error('Got a deeplink that didn\'t match', nomatch);
      });
    });
  }



}

