import dispatcher from "../dispatcher";
import axios from 'axios';

export function fetchMeterItems(property_id, prop_master_id, type) {
  var url = 'http://52.39.72.94:3000/Property/getMeterItems';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': 'Bearer ' +  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOjYsImlhdCI6MTQ4Njk5MzQyNn0.aGfRrEnbiPSH_1sPhxikafaSdudhr9mSnEGkhCUN6dc'
           },
          data: {
            property_id,
            prop_master_id,
            type
          }
        })
        .then(function (response) {
          dispatcher.dispatch({
            type: "GET_ITEMSDEAILS",
            data: response.data
          });

        })
        .catch(function (error) {
          console.log(error);
        });

}


export function updateMeterItems(property_id, data){


  var url = 'http://52.39.72.94:3000/Property/updateSingleItem';
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
            type: "UPDATE_SINGLEITEM",
            data: response.data
          });

        })
        .catch(function (error) {
          console.log(error);
        });

}
