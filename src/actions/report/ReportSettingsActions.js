import dispatcher from "../../dispatcher";
import axios from 'axios';
import config from '../../config/config';
import loginauth from '../../auth/loginauth';

export function fetchReportSettings() {

  var url = config.REPORT_ENDPOINT_URL + 'getreportsettings';
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
            type: "GET_REPORT_SETTINGS",
            data: response.data,
          });

        })
        .catch(function (error) {
          console.log(error);
        });

}

export function updateReportSettings(report_settings, report_settings_notes) {

  var url = config.REPORT_ENDPOINT_URL + 'updateReportSettings';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': loginauth.AUTHTOKEN
           },
           data:{
             report_settings,
             report_settings_notes
           }
        })
        .then(function (response) {
          console.log(response);
          dispatcher.dispatch({
            type: "UPDATE_REPORT_SETTINGS",
            data: response.data,
          });

        })
        .catch(function (error) {
          console.log(error);
        });

}

export function uploadReportLogo(file){

  var url =  config.REPORT_ENDPOINT_URL + 'uploadlogo';

  var formData = new FormData();
  formData.append("logo", file, file.name);

  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': loginauth.AUTHTOKEN,
             'Content-Type': 'multipart/form-data'
           },
          data: formData
        })
        .then(function (response) {
          dispatcher.dispatch({
            type: "UPLOAD_REPORT_LOGO",
            data: response.data
          });

        })
        .catch(function (error) {
          console.log(error);
        });

}
