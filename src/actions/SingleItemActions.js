import dispatcher from "../dispatcher";
import axios from 'axios';
import config from '../config/config';
import loginauth from '../auth/loginauth';

export function fetchSingleItem(property_id, prop_master_id, type) {
  var url = config.ENDPOINT_URL + 'getSingleItem';

  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': loginauth.AUTHTOKEN
           },
          data: {
            property_id,
            prop_master_id,
            type
          }
        })
        .then(function (response) {
          console.log(response);
          dispatcher.dispatch({
            type: "GET_ITEMSDEAILS",
            data: response.data
          });

        })
        .catch(function (error) {
          console.log(error);
        });

}


export function updateSingleItem(property_id, data){

  var url = config.ENDPOINT_URL + 'updateSingleItem';

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
            type: "UPDATE_SINGLEITEM",
            data: response.data,
            temp: data
          });

        })
        .catch(function (error) {
          console.log(error);
        });

}
