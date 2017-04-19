import dispatcher from "../dispatcher";
import axios from 'axios';

export function fetchGeneralConditions(property_id) {

  var url = 'http://52.39.72.94:3000/Property/getgeneralconditionlist';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': 'Bearer ' +  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOjYsImlhdCI6MTQ4Njk5MzQyNn0.aGfRrEnbiPSH_1sPhxikafaSdudhr9mSnEGkhCUN6dc'
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

  var url = 'http://52.39.72.94:3000/Property/updategeneralcondition';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': 'Bearer ' +  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOjYsImlhdCI6MTQ4Njk5MzQyNn0.aGfRrEnbiPSH_1sPhxikafaSdudhr9mSnEGkhCUN6dc'
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

  var url = 'http://52.39.72.94:3000/Property/sortgeneralcondition';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': 'Bearer ' +  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOjYsImlhdCI6MTQ4Njk5MzQyNn0.aGfRrEnbiPSH_1sPhxikafaSdudhr9mSnEGkhCUN6dc'
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
