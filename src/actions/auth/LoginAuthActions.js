import dispatcher from "../../dispatcher";
import axios from 'axios';
import config from '../../config/config';
import loginauth from '../../auth/loginauth';

export function authenticate(username, password) {

  var url = config.SERVER_ENDPOINT_URL + 'auth/authenticate';
  axios({
          method: 'post',
          url: url,
          headers: {
           },
          data: {
            email: username,
            password: password
          }
        })
        .then(function (response) {
          console.log(response);
          dispatcher.dispatch({
            type: "IS_LOGIN",
            data: response.data,
          });

        })
        .catch(function (error) {
          console.log(error);
        });

}

export function logout(){
  sessionStorage.removeItem('pgauth');
  dispatcher.dispatch({
    type: "LOGOUT",
    data: {status: 1},
  });
}

export function register(data) {

  var url = config.SERVER_ENDPOINT_URL + 'auth/register';
  axios({
          method: 'post',
          url: url,
          headers: {
           },
          data: data
        })
        .then(function (response) {
          console.log(response);
          dispatcher.dispatch({
            type: "SIGNUP",
            data: response.data,
          });

        })
        .catch(function (error) {
          console.log(error);
        });

}

export function fetchUsers(){

  var url = config.ENDPOINT_URL + 'getusers';
  axios({
      method: 'post',
      url: url,
      headers: {
         'Authorization': loginauth.AUTHTOKEN
       }
    })
    .then(function (response) {
      console.log(response.data);
      dispatcher.dispatch({
        type: "GET_USERS",
        data: response.data,
      });

    })
    .catch(function (error) {
      console.log(error);
    });

}


export function removeUser(user_id){

  var url = config.ENDPOINT_URL + 'removeuser';
  axios({
      method: 'post',
      url: url,
      headers: {
         'Authorization': loginauth.AUTHTOKEN
       },
       data:{
         user_id
       }
    })
    .then(function (response) {
      console.log(response.data);
      dispatcher.dispatch({
        type: "DELETE_USER",
        data: response.data,
      });

    })
    .catch(function (error) {
      console.log(error);
    });

}


export function registerUser(data) {

  var url = config.ENDPOINT_URL + 'registeruser';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': loginauth.AUTHTOKEN
           },
          data: data
        })
        .then(function (response) {
          console.log(response);
          dispatcher.dispatch({
            type: "ADD_USER",
            data: response.data,
          });

        })
        .catch(function (error) {
          console.log(error);
        });

}

export function changepassword(data) {

  var url = config.ENDPOINT_URL + 'changepassword';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': loginauth.AUTHTOKEN
           },
          data: data
        })
        .then(function (response) {
          console.log(response);
          dispatcher.dispatch({
            type: "CHANGE_PASSWORD",
            data: response.data,
          });

        })
        .catch(function (error) {
          console.log(error);
        });

}
