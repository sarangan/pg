import dispatcher from "../../dispatcher";
import axios from 'axios';

export function fetchTemplateList() {

  var url = 'http://52.39.72.94:3000/Property/getcompanytemplate';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': 'Bearer ' +  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOjYsImlhdCI6MTQ4Njk5MzQyNn0.aGfRrEnbiPSH_1sPhxikafaSdudhr9mSnEGkhCUN6dc'
           }
        })
        .then(function (response) {
          console.log(response.data);
          dispatcher.dispatch({
            type: "GET_TEMPLATELIST",
            data: response.data,
          });

        })
        .catch(function (error) {
          console.log(error);
        });

}

export function deleteMasterItemTemplate(master_id){

  var url = 'http://52.39.72.94:3000/Property/deletecompanytemplate';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': 'Bearer ' +  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOjYsImlhdCI6MTQ4Njk5MzQyNn0.aGfRrEnbiPSH_1sPhxikafaSdudhr9mSnEGkhCUN6dc'
           },
          data: {
            master_id
          }
        })
        .then(function (response) {

          dispatcher.dispatch({
            type: "DELETE_MASTERITEMTEMPLATE",
            data: response.data
          });

        })
        .catch(function (error) {
          console.log(error);
        });

}

export function updateMasteritemTemplate(data){

  var url = 'http://52.39.72.94:3000/Property/updatecompanytemplate';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': 'Bearer ' +  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOjYsImlhdCI6MTQ4Njk5MzQyNn0.aGfRrEnbiPSH_1sPhxikafaSdudhr9mSnEGkhCUN6dc'
           },
          data: {
            master_item: data
          }
        })
        .then(function (response) {

          dispatcher.dispatch({
            type: "UPDATE_MASTERITEMTEMPLATE",
            data: response.data
          });

        })
        .catch(function (error) {
          console.log(error);
        });

}

export function insertMasterItemTemplate(data){

  var url = 'http://52.39.72.94:3000/Property/insertcompanytemplate';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': 'Bearer ' +  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOjYsImlhdCI6MTQ4Njk5MzQyNn0.aGfRrEnbiPSH_1sPhxikafaSdudhr9mSnEGkhCUN6dc'
           },
          data: {
            master_item: data
          }
        })
        .then(function (response) {
          console.log(response);
          dispatcher.dispatch({
            type: "INSERT_MASTERITEMTEMPLATE",
            data: response.data
          });

        })
        .catch(function (error) {
          console.log(error);
        });

}

export function sortMasteritemTemplate(data){

  var url = 'http://52.39.72.94:3000/Property/sortcompanytemplate';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': 'Bearer ' +  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOjYsImlhdCI6MTQ4Njk5MzQyNn0.aGfRrEnbiPSH_1sPhxikafaSdudhr9mSnEGkhCUN6dc'
           },
          data: {
            master_list: data
          }
        })
        .then(function (response) {
          console.log(response.data);
          // dispatcher.dispatch({
          //   type: "UPDATE_MASTERITEMTEMPLATE",
          //   data: response.data
          // });

        })
        .catch(function (error) {
          console.log(error);
        });

}
