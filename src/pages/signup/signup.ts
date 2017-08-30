import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { NavController} from 'ionic-angular';
import { BackandServiceClass } from '../../app/services/backand.service';
import { User } from '../../providers/user';
import { TranslateService } from '@ngx-translate/core';
import { MainPage } from '../../pages/pages';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { firstName: string, lastName: string, email: string, password: string } = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };

  // Our translated text strings
  private signupErrorString: string;

  constructor(
    public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    private backand: BackandServiceClass
   ) {

    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    })
  }

  doSignup() {
    // Attempt to login in through our User service
    this.backand.signUp(this.account).then(response => {
      this.navCtrl.push(MainPage)  
    }, (reason) =>{
      console.log(reason);
      // Unable to signup
   let toast = this.toastCtrl.create({
     message: this.signupErrorString,
     duration: 3000,
     position: 'top'
   });
   toast.present();
      return('error');}

    );
    
    // this.user.signup(this.account).subscribe((resp) => {
    //   this.navCtrl.push(MainPage);
    // }
    // , (err) => {

    //   //this.navCtrl.push(MainPage); // TODO: Remove this when you add your signup endpoint

    //   // Unable to sign up
    //   let toast = this.toastCtrl.create({
    //     message: this.signupErrorString,
    //     duration: 3000,
    //     position: 'top'
    //   });
    //   toast.present();
    // });
  }
}
