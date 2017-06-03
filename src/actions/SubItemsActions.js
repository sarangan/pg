import dispatcher from "../dispatcher";
import axios from 'axios';
import config from '../config/config';
import loginauth from '../auth/loginauth';

export function fetchSubitemslist(property_id, prop_master_id) {

  var url = config.ENDPOINT_URL + 'getSubItemsList';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': loginauth.AUTHTOKEN
           },
          data: {
            property_id,
            prop_master_id
          }
        })
        .then(function (response) {
          console.log(response);
          dispatcher.dispatch({
            type: "GET_SUBITEMSLIST",
            data: response.data,
          });

        })
        .catch(function (error) {
          console.log(error);
        });

}


export function updateSubItems(property_id, prop_master_id, sub_list, gen_comment){


  var url = config.ENDPOINT_URL + 'updatesubitems';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': loginauth.AUTHTOKEN
           },
          data: {
            property_id,
            prop_master_id,
            sub_list,
            gen_comment
          }
        })
        .then(function (response) {
          console.log(response);
          dispatcher.dispatch({
            type: "UPDATE_SUBITEMS",
            data: response.data
          });

        })
        .catch(function (error) {
          console.log(error);
        });

}
