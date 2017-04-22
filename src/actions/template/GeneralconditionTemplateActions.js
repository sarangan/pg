import dispatcher from "../../dispatcher";
import axios from 'axios';
import config from '../../config/config';
import loginauth from '../../auth/loginauth';

export function getGeneralConditionsTemplate() {

  var url = config.ENDPOINT_URL + 'getgeneralconditiontemplate';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': loginauth.AUTHTOKEN
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

  var url = config.ENDPOINT_URL + 'updategeneralconditiontemplate';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': loginauth.AUTHTOKEN
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

  var url = config.ENDPOINT_URL + 'insertgeneralconditiontemplate';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': loginauth.AUTHTOKEN
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

  var url = config.ENDPOINT_URL + 'deletegeneralconditiontemplate';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': loginauth.AUTHTOKEN
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

  var url = config.ENDPOINT_URL + 'sortgeneralconditiontemplate';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': loginauth.AUTHTOKEN
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
