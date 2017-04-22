import dispatcher from "../dispatcher";
import axios from 'axios';
import config from '../config/config';
import loginauth from '../auth/loginauth';

export function fetchTempalte(property_id) {

  var url = config.ENDPOINT_URL + 'getTemplate';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': loginauth.AUTHTOKEN
           },
          data: {
            property_id: property_id
          }
        })
        .then(function (response) {
          console.log(response);

          dispatcher.dispatch({
            type: "GET_PROPERTYTEMPLATE",
            data: response.data,
          });

        })
        .catch(function (error) {
          console.log(error);
        });

}

export function saveTemplate(data){

  var url = config.ENDPOINT_URL + 'saveTemplate';
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
            type: "SAVE_PROPERTYTEMPLATE",
            data: response.data.status
          });

        })
        .catch(function (error) {
          console.log(error);
        });

}
