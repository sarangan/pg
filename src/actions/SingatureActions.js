import dispatcher from "../dispatcher";
import axios from 'axios';
import config from '../config/config';
import loginauth from '../auth/loginauth';

export function fetchSingatures(property_id) {

  var url = config.ENDPOINT_URL + 'getSignaturesList';
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
          console.log(response);
          dispatcher.dispatch({
            type: "GET_SINGS",
            data: response.data,
          });

        })
        .catch(function (error) {
          console.log(error);
        });

}


export function updateSingatures(property_id, data) {

  var url = config.ENDPOINT_URL + 'updateSignaturesList';
  //data['property_id'] = property_id;
  let formData = {
    property_id,
    data
  }
  console.log(data);

  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': loginauth.AUTHTOKEN
           },
          data: formData
        })
        .then(function (response) {
          //console.log(response);
          dispatcher.dispatch({
            type: "UPDATE_SINGS",
            data: response.data
          });

        })
        .catch(function (error) {
          console.log(error);
        });

}
