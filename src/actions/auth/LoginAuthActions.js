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
