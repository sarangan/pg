import { EventEmitter } from "events";
import dispatcher from "../../dispatcher";
import loginauth from '../../auth/loginauth';

class LoginStore extends EventEmitter {
  constructor() {
    super();
    this.isLogin = false;
    this.userDetails = {};
    this.loginerr  = '';
    this.isLogout = false;
    this.registererr  = '';
    this.registerAccountStatus = false;
  }

  getLoginStatus() {
    return this.isLogin;
  }

  getLoginError(){
    return this.loginerr;
  }

  getUserDetails() {
    return this.userDetails;
  }

  getLogoutStatus(){
    return this.isLogout;
  }

  getRegisterStatus(){
    return this.registerAccountStatus;
  }

  getRegisterError(){
    return this.registererr;
  }

  handleActions(action) {

      switch(action.type) {

        case "IS_LOGIN": {

          var keys = Object.keys(action.data).map(function(x){ return x.toUpperCase() })

          if( keys.indexOf( ("token").toUpperCase() )  != -1 ){
            //login success

              let userDetails = {
                  user_id : action.data.user.id,
                  email :  action.data.user.email,
                  company_id : action.data.user.company_id,
                  type : action.data.user.type,
                  first_name : action.data.user.first_name,
                  last_name : action.data.user.last_name,
                  contact : action.data.user.contact
              };
              this.userDetails = userDetails;
              this.isLogin = true;
              this.loginerr  = '';

              loginauth["AUTHTOKEN"] = 'Bearer ' + action.data.token;
              loginauth["ISLOGIN"] =  true;
              loginauth["USER"] =  userDetails;

              let pgauth = {
                token: 'Bearer ' + action.data.token,
                isLogin: true,
                user: userDetails
              };
              sessionStorage.removeItem('pgauth');
              sessionStorage.setItem('pgauth', JSON.stringify(pgauth) ); // store to session store

          }
          else{
            this.userDetails = {};
            this.isLogin = false;
            this.loginerr  = '';

            sessionStorage.removeItem('pgauth');
            if(action.data.hasOwnProperty('err')){
              this.loginerr  = action.data.err;
            }
          }
          this.isLogout = false;
          this.registererr  = '';
          this.registerAccountStatus =  false;
          this.emit("change");
          break;

      }
      case "LOGOUT": {
        if(action.data.status){
          this.userDetails = {};
          this.isLogin = false;
          this.loginerr  = '';
          this.isLogout = true;
          loginauth["AUTHTOKEN"] = "";
          loginauth["ISLOGIN"] =  false;
          loginauth["USER"] =  {};
          this.registererr  = '';
          this.registerAccountStatus =  false;
          sessionStorage.removeItem('pgauth');
        }
        this.emit("change");
        break;
      }

      case "SIGNUP":{

        if(action.data.status == 1){
          this.registerAccountStatus =  true;
          this.registererr = '';
        }
        else{
          this.registererr  = action.data.text;
          this.registerAccountStatus =  false;

          this.userDetails = {};
          this.isLogin = false;
          this.loginerr  = '';
          this.isLogout = true;
          loginauth["AUTHTOKEN"] = "";
          loginauth["ISLOGIN"] =  false;
          loginauth["USER"] =  {};
          sessionStorage.removeItem('pgauth');
        }
        this.emit('change');
        break;
      }

    }

  }

}

const loginStore = new LoginStore;
dispatcher.register(loginStore.handleActions.bind(loginStore));

export default loginStore;
