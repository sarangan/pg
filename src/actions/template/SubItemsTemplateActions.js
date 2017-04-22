import dispatcher from "../../dispatcher";
import axios from 'axios';
import config from '../../config/config';
import loginauth from '../../auth/loginauth';

export function fetchSubitemstemplate(com_master_id) {

  var url = config.ENDPOINT_URL + 'getsubitemstmplate';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': loginauth.AUTHTOKEN
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

  var url = config.ENDPOINT_URL + 'updatesubitemstemplate';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': loginauth.AUTHTOKEN
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

  var url = config.ENDPOINT_URL + 'deletesubitemstemplate';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': loginauth.AUTHTOKEN
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

  var url = config.ENDPOINT_URL + 'insertsubitemtemplate';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': loginauth.AUTHTOKEN
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

  var url = config.ENDPOINT_URL + 'sortsubitemstemplate';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': loginauth.AUTHTOKEN
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
