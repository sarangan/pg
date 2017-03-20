import dispatcher from "../dispatcher";
import axios from 'axios';

export function fetchMeterItems(property_id) {
  var url = 'http://52.39.72.94:3000/Property/getMeterList';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': 'Bearer ' +  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOjYsImlhdCI6MTQ4Njk5MzQyNn0.aGfRrEnbiPSH_1sPhxikafaSdudhr9mSnEGkhCUN6dc'
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


  var url = 'http://52.39.72.94:3000/Property/updatemeterlist';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': 'Bearer ' +  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOjYsImlhdCI6MTQ4Njk5MzQyNn0.aGfRrEnbiPSH_1sPhxikafaSdudhr9mSnEGkhCUN6dc'
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
