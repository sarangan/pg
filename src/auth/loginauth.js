'use strict';

var login = {
  AUTHTOKEN: '',
  ISLOGIN: false,
  USER: {}
}

if(!login.AUTHTOKEN){
  //check the session
  let pgauth = sessionStorage.getItem('pgauth');
  if(pgauth){
    pgauth = JSON.parse(pgauth);
    login["AUTHTOKEN"] = pgauth.token;
    login["ISLOGIN"] =  pgauth.isLogin;
    login["USER"] =  pgauth.user;
  }
}

module.exports = login;
