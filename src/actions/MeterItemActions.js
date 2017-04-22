import dispatcher from "../dispatcher";
import axios from 'axios';
import config from '../config/config';
import loginauth from '../auth/loginauth';

export function fetchMeterItems(property_id) {
  var url = config.ENDPOINT_URL + 'getMeterList';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': loginauth.AUTHTOKEN
           },
          data: {
            property_id
          }
        })
        .then(function (response) {

          dispatcher.dispatch({
            type: "GET_METERITEMS",
            data: response.data
          });

        })
        .catch(function (error) {
          console.log(error);
        });

}


export function updateMeterItems(property_id, data){


  var url = config.ENDPOINT_URL + 'updatemeterlist';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': loginauth.AUTHTOKEN
           },
          data: {
            property_id,
            data
          }
        })
        .then(function (response) {

          dispatcher.dispatch({
            type: "UPDATE_METERITEMS",
            data: response.data
          });

        })
        .catch(function (error) {
          console.log(error);
        });

}
