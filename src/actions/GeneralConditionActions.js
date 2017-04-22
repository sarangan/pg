import dispatcher from "../dispatcher";
import axios from 'axios';
import config from '../config/config';
import loginauth from '../auth/loginauth';

export function fetchGeneralConditions(property_id) {

  var url = config.ENDPOINT_URL + 'getgeneralconditionlist';
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
            type: "GET_GENERALCONDITIONLIST",
            data: response.data,
          });

        })
        .catch(function (error) {
          console.log(error);
        });

}

export function updateGeneralCondition(property_id, data){

  var url = config.ENDPOINT_URL + 'updategeneralcondition';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': loginauth.AUTHTOKEN
           },
          data: {
            property_id,
            gen_list: data
          }
        })
        .then(function (response) {

          dispatcher.dispatch({
            type: "UPDATE_GENERALCONDITIONLIST",
            data: response.data
          });

        })
        .catch(function (error) {
          console.log(error);
        });

}

export function updateSortGeneralCondition(property_id, data){

  var url = config.ENDPOINT_URL + 'sortgeneralcondition';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': loginauth.AUTHTOKEN
           },
          data: {
            property_id,
            gen_list: data
          }
        })
        .then(function (response) {
          console.log(response.data);
          // dispatcher.dispatch({
          //   type: "UPDATE_GENERALCONDITIONLIST",
          //   data: response.data
          // });

          //we dont need to pull again

        })
        .catch(function (error) {
          console.log(error);
        });

}
