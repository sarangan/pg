import dispatcher from "../../dispatcher";
import axios from 'axios';

export function getGeneralConditionsTemplate() {

  var url = 'http://52.39.72.94:3000/Property/getgeneralconditiontemplate';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': 'Bearer ' +  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOjYsImlhdCI6MTQ4Njk5MzQyNn0.aGfRrEnbiPSH_1sPhxikafaSdudhr9mSnEGkhCUN6dc'
           }
        })
        .then(function (response) {

          dispatcher.dispatch({
            type: "GET_GENERALCONDITIONTEMPLATE",
            data: response.data,
          });

        })
        .catch(function (error) {
          console.log(error);
        });

}

export function updateGeneralConditionTemplate(data){

  var url = 'http://52.39.72.94:3000/Property/updategeneralconditiontemplate';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': 'Bearer ' +  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOjYsImlhdCI6MTQ4Njk5MzQyNn0.aGfRrEnbiPSH_1sPhxikafaSdudhr9mSnEGkhCUN6dc'
           },
          data: {
            gen_list: data
          }
        })
        .then(function (response) {

          dispatcher.dispatch({
            type: "UPDATE_GENERALCONDITIONTEMPLATE",
            data: response.data
          });

        })
        .catch(function (error) {
          console.log(error);
        });

}

export function insertGeneralConditionTemplate(data){

  var url = 'http://52.39.72.94:3000/Property/insertgeneralconditiontemplate';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': 'Bearer ' +  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOjYsImlhdCI6MTQ4Njk5MzQyNn0.aGfRrEnbiPSH_1sPhxikafaSdudhr9mSnEGkhCUN6dc'
           },
          data: {
            gen_item: data
          }
        })
        .then(function (response) {

          dispatcher.dispatch({
            type: "INSERT_GENERALCONDITIONTEMPLATE",
            data: response.data
          });

        })
        .catch(function (error) {
          console.log(error);
        });

}

export function deleteGeneralConditionTemplate(gen_id){

  var url = 'http://52.39.72.94:3000/Property/deletegeneralconditiontemplate';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': 'Bearer ' +  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOjYsImlhdCI6MTQ4Njk5MzQyNn0.aGfRrEnbiPSH_1sPhxikafaSdudhr9mSnEGkhCUN6dc'
           },
          data: {
            general_id: gen_id
          }
        })
        .then(function (response) {

          dispatcher.dispatch({
            type: "DELETE_GENERALCONDITIONTEMPLATE_ITEM",
            data: response.data
          });

        })
        .catch(function (error) {
          console.log(error);
        });

}

export function updateSortGeneralConditionTemplate(data){

  var url = 'http://52.39.72.94:3000/Property/sortgeneralconditiontemplate';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': 'Bearer ' +  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOjYsImlhdCI6MTQ4Njk5MzQyNn0.aGfRrEnbiPSH_1sPhxikafaSdudhr9mSnEGkhCUN6dc'
           },
          data: {
            gen_list: data
          }
        })
        .then(function (response) {
          console.log(response.data);
          // dispatcher.dispatch({
          //   type: "UPDATE_GENERALCONDITIONTEMPLATE",
          //   data: response.data
          // });

        })
        .catch(function (error) {
          console.log(error);
        });

}
