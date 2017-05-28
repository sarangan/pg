import { EventEmitter } from "events";
import dispatcher from "../../dispatcher";
import loginauth from '../../auth/loginauth';

class LoginStore extends EventEmitter {
  constructor() {
    super();
    this.isLogin = false;
    this.userDetails = {};
  }

  getLoginStatus() {
    return this.isLogin;
  }

  getUserDetails() {
    return this.userDetails;
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

              loginauth["AUTHTOKEN"] = 'Bearer ' + action.data.token;

          }
          this.emit("change");
          break;

      }

    }

  }

}

const loginStore = new LoginStore;
dispatcher.register(loginStore.handleActions.bind(loginStore));

export default loginStore;
