import dispatcher from "../dispatcher";
import axios from 'axios';
import config from '../config/config';
import loginauth from '../auth/loginauth';

export function fetchPropList() {

  var url = config.ENDPOINT_URL + 'inspections';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': loginauth.AUTHTOKEN
           },
          data: {
          }
        })
        .then(function (response) {
          console.log(response);

          dispatcher.dispatch({
            type: "GET_PROPERTYLIST",
            data: response.data,
          });

        })
        .catch(function (error) {
          console.log(error);
        });

}

export function generateReport(property_id) {

  var url = config.REPORT_ENDPOINT_URL + 'generatereport';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': loginauth.AUTHTOKEN
           },
          data: {
            property_id
          }
        })
        .then(function (response) {
          console.log(response);

        })
        .catch(function (error) {
          console.log(error);
        });

}
