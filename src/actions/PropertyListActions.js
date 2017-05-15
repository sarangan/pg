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
          },
          responseType:'stream'
        })
        .then(function (response) {
          console.log(response);

          let data = response;
          let filename = "report.pdf";
          let mime = 'application/octet-stream';


            var blob = new Blob([data], {type: mime || 'application/octet-stream'});
            if (typeof window.navigator.msSaveBlob !== 'undefined') {
               // IE workaround for "HTML7007: One or more blob URLs were
               // revoked by closing the blob for which they were created.
               // These URLs will no longer resolve as the data backing
               // the URL has been freed."
               window.navigator.msSaveBlob(blob, filename);

               console.log('blob');

            }
            else {

              console.log('url');

              var element = document.createElement('a');
              element.setAttribute('href', 'data:application/octet-stream;charset=utf-8,' + encodeURIComponent(response));
              element.setAttribute('download', filename);

              element.style.display = 'none';
              document.body.appendChild(element);

              element.click();

              document.body.removeChild(element);


              //  var blobURL = window.URL.createObjectURL(blob);
              //  var tempLink = document.createElement('a');
              //  tempLink.href = blobURL;
              //  tempLink.setAttribute('download', filename);
              //  tempLink.setAttribute('target', '_blank');
              //  document.body.appendChild(tempLink);
              //  tempLink.click();
              //  document.body.removeChild(tempLink);
             }



        })
        .catch(function (error) {
          console.log(error);
        });

}
