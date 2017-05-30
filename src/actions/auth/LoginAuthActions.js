import dispatcher from "../../dispatcher";
import axios from 'axios';
import config from '../../config/config';


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
