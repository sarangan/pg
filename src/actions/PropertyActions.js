import dispatcher from "../dispatcher";
import axios from 'axios';
import config from '../config/config';
import loginauth from '../auth/loginauth';

export function addProperty(data) {

  console.log(data);

  var url = config.ENDPOINT_URL + 'add';
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
            type: "ADD_PROPERTY",
            data: response.data
          });

        })
        .catch(function (error) {
          console.log(error);
        });

}

export function getProperty(property_id){

  var url = config.ENDPOINT_URL + 'getProperty';
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

        dispatcher.dispatch({
          type: "GET_PROPERTY",
          data: response.data,
        });

      })
      .catch(function (error) {
        console.log(error);
      });

}

export function updateProperty(property_id, data) {

  var url = config.ENDPOINT_URL + 'edit';
  data['property_id'] = property_id;
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': loginauth.AUTHTOKEN
           },
          data: data
        })
        .then(function (response) {

          dispatcher.dispatch({
            type: "UPDATE_PROPERTY",
            data: response.data
          });

        })
        .catch(function (error) {
          console.log(error);
        });

}
