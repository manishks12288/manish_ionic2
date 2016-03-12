import {IonicApp,Page, NavController, NavParams} from 'ionic-angular';
import {UserData} from '../../providers/user-data/user-data';


@Page({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {
    private login:any;
    private submitted:boolean;
    resultdata;  
  constructor(private nav: NavController, private userData:UserData) {
    // If we navigated to this page, we will have an item available as a nav param
    this.nav = nav;
    this.login = {};
    this.submitted = false;
    this.userData = userData;
  }
  onLogin(form) {
    this.submitted = true;
    if (form.valid) {
        console.log(this.userData);
      console.log("yes valid");
    }else{
       console.log("not valid"); 
    }
  }
}