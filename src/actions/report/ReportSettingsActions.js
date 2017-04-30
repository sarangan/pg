import dispatcher from "../../dispatcher";
import axios from 'axios';
import config from '../../config/config';
import loginauth from '../../auth/loginauth';

export function fetchTemplateList() {

  var url = config.ENDPOINT_URL + 'getreportsettings';
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
