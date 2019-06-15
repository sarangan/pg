import dispatcher from "../dispatcher";
import axios from 'axios';
import config from '../config/config';
import loginauth from '../auth/loginauth';

export function fetchHistory() {

  var url = config.ENDPOINT_URL + 'payments';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': loginauth.AUTHTOKEN
           },
          data: {
          }
        })
        .then(function (response) {
          console.log(response);
          dispatcher.dispatch({
            type: "GET_PAYMENTS",
            data: response.data,
          });

        })
        .catch(function (error) {
          console.log(error);
        });

}
