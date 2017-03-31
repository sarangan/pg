import dispatcher from "../../dispatcher";
import axios from 'axios';

export function fetchMeterListtemplate() {

  var url = 'http://52.39.72.94:3000/Property/getmeterlisttemplate';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': 'Bearer ' +  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOjYsImlhdCI6MTQ4Njk5MzQyNn0.aGfRrEnbiPSH_1sPhxikafaSdudhr9mSnEGkhCUN6dc'
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

  var url = 'http://52.39.72.94:3000/Property/updatemeterlisttemplate';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': 'Bearer ' +  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOjYsImlhdCI6MTQ4Njk5MzQyNn0.aGfRrEnbiPSH_1sPhxikafaSdudhr9mSnEGkhCUN6dc'
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

  var url = 'http://52.39.72.94:3000/Property/deletemeteritemtemplate';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': 'Bearer ' +  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOjYsImlhdCI6MTQ4Njk5MzQyNn0.aGfRrEnbiPSH_1sPhxikafaSdudhr9mSnEGkhCUN6dc'
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

  var url = 'http://52.39.72.94:3000/Property/insertmeteritemtemplate';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': 'Bearer ' +  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOjYsImlhdCI6MTQ4Njk5MzQyNn0.aGfRrEnbiPSH_1sPhxikafaSdudhr9mSnEGkhCUN6dc'
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
