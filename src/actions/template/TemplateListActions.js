import dispatcher from "../../dispatcher";
import axios from 'axios';
import config from '../../config/config';
import loginauth from '../../auth/loginauth';

export function fetchTemplateList() {

  var url = config.ENDPOINT_URL + 'getcompanytemplate';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': loginauth.AUTHTOKEN
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

  var url = config.ENDPOINT_URL + 'deletecompanytemplate';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': loginauth.AUTHTOKEN
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

  var url = config.ENDPOINT_URL + 'updatecompanytemplate';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': loginauth.AUTHTOKEN
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

  var url = config.ENDPOINT_URL + 'insertcompanytemplate';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': loginauth.AUTHTOKEN
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

  var url = config.ENDPOINT_URL + 'sortcompanytemplate';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': loginauth.AUTHTOKEN
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
