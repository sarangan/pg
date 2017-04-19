import dispatcher from "../../dispatcher";
import axios from 'axios';

export function fetchSubitemstemplate(com_master_id) {

  var url = 'http://52.39.72.94:3000/Property/getsubitemstmplate';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': 'Bearer ' +  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOjYsImlhdCI6MTQ4Njk5MzQyNn0.aGfRrEnbiPSH_1sPhxikafaSdudhr9mSnEGkhCUN6dc'
           },
          data: {
            com_master_id
          }
        })
        .then(function (response) {
          dispatcher.dispatch({
            type: "GET_TEMPLATESUBITEMSLIST",
            data: response.data,
          });

        })
        .catch(function (error) {
          console.log(error);
        });

}

export function updateSubItemsTemplate(data){

  var url = 'http://52.39.72.94:3000/Property/updatesubitemstemplate';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': 'Bearer ' +  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOjYsImlhdCI6MTQ4Njk5MzQyNn0.aGfRrEnbiPSH_1sPhxikafaSdudhr9mSnEGkhCUN6dc'
           },
          data: {
            sub_items: data
          }
        })
        .then(function (response) {

          dispatcher.dispatch({
            type: "UPDATE_SUBITEMSTEMPLATE",
            data: response.data
          });

        })
        .catch(function (error) {
          console.log(error);
        });

}

export function deleteSubItemsTemplate(sub_id){

  var url = 'http://52.39.72.94:3000/Property/deletesubitemstemplate';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': 'Bearer ' +  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOjYsImlhdCI6MTQ4Njk5MzQyNn0.aGfRrEnbiPSH_1sPhxikafaSdudhr9mSnEGkhCUN6dc'
           },
          data: {
            sub_id: sub_id
          }
        })
        .then(function (response) {

          dispatcher.dispatch({
            type: "DELETE_SUBITEMTEMPLATE_ITEM",
            data: response.data
          });

        })
        .catch(function (error) {
          console.log(error);
        });

}

export function insertSubItemTemplate(data){

  var url = 'http://52.39.72.94:3000/Property/insertsubitemtemplate';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': 'Bearer ' +  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOjYsImlhdCI6MTQ4Njk5MzQyNn0.aGfRrEnbiPSH_1sPhxikafaSdudhr9mSnEGkhCUN6dc'
           },
          data: {
            sub_item: data
          }
        })
        .then(function (response) {

          dispatcher.dispatch({
            type: "INSERT_SUBITEMTEMPLATE",
            data: response.data
          });

        })
        .catch(function (error) {
          console.log(error);
        });

}

export function updateSortSubItemsTemplate(data){

  var url = 'http://52.39.72.94:3000/Property/sortsubitemstemplate';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': 'Bearer ' +  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOjYsImlhdCI6MTQ4Njk5MzQyNn0.aGfRrEnbiPSH_1sPhxikafaSdudhr9mSnEGkhCUN6dc'
           },
          data: {
            sub_items: data
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
