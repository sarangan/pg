import dispatcher from "../../dispatcher";
import axios from 'axios';
import config from '../../config/config';
import loginauth from '../../auth/loginauth';

export function fetchMeterListtemplate() {

  var url = config.ENDPOINT_URL + 'getmeterlisttemplate';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': loginauth.AUTHTOKEN
           }
        })
        .then(function (response) {
          dispatcher.dispatch({
            type: "GET_TEMPLATEMETERLIST",
            data: response.data,
          });

        })
        .catch(function (error) {
          console.log(error);
        });

}

export function updateMeterListTemplate(data){

  var url = config.ENDPOINT_URL + 'updatemeterlisttemplate';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': loginauth.AUTHTOKEN
           },
          data: {
            meter_list: data
          }
        })
        .then(function (response) {

          dispatcher.dispatch({
            type: "UPDATE_METERLISTTEMPLATE",
            data: response.data
          });

        })
        .catch(function (error) {
          console.log(error);
        });

}

export function deleteMeterItemTemplate(meter_id){

  var url = config.ENDPOINT_URL + 'deletemeteritemtemplate';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': loginauth.AUTHTOKEN
           },
          data: {
            meter_id
          }
        })
        .then(function (response) {

          dispatcher.dispatch({
            type: "DELETE_METERTEMPLATE_ITEM",
            data: response.data
          });

        })
        .catch(function (error) {
          console.log(error);
        });

}

export function insertMeterItemTemplate(data){

  var url = config.ENDPOINT_URL + 'insertmeteritemtemplate';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': loginauth.AUTHTOKEN
           },
          data: {
            meter_item: data
          }
        })
        .then(function (response) {

          dispatcher.dispatch({
            type: "INSERT_METERITEMTEMPLATE",
            data: response.data
          });

        })
        .catch(function (error) {
          console.log(error);
        });

}
