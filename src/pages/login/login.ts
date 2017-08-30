import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { BackandServiceClass } from '../../app/services/backand.service';
import { MainPage } from '../../pages/pages';
import { User } from '../../providers/user';

import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { email: string, password: string } = {
    email: 'c@c.com',
    password: 'vaibhav'
  };

  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    private backand: BackandServiceClass) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }

  // Attempt to login in through our User service
  doLogin() {
     this.backand.login(this.account.email, this.account.password).then( response => {
      this.navCtrl.push(MainPage);
      }, (reason) =>{
        console.log(reason);
        // Unable to log in
     let toast = this.toastCtrl.create({
       message: this.loginErrorString,
       duration: 3000,
       position: 'top'
     });
     toast.present();
        return('error');}
    );
   
    // this.user.login(this.account).subscribe((resp) => {
    //   this.navCtrl.push(MainPage);
    // }, (err) => {
    //   this.navCtrl.push(MainPage);
    //   // Unable to log in
    //   let toast = this.toastCtrl.create({
    //     message: this.loginErrorString,
    //     duration: 3000,
    //     position: 'top'
    //   });
    //   toast.present();
    // });
  }
}
