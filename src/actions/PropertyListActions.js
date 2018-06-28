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

  console.log(property_id);

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
          responseType:'blob'
        })
        .then(function (response) {
          console.log(response);

          var blob = response.data;
          let type = 'application/octet-stream';
          let d = document.createElement("a");
          d.className = "download";
          d.download = "report.pdf";
          d.href = URL.createObjectURL(blob);
          document.body.appendChild(d);
          d.click();
          d.parentElement.removeChild(d);

          dispatcher.dispatch({
            type: "REPORT_READY",
            data: true
          });

          /*let data = response;
          let filename = "report.pdf";
          let mime = 'application/octet-stream';

          var reader = new window.FileReader();
        	reader.readAsDataURL(response.data);
        	reader.onload = function() {

        	    var imageDataUrl = reader.result;
              //var blobURL = window.URL.createObjectURL(blob);
              var tempLink = document.createElement('a');
              tempLink.href = imageDataUrl;
              tempLink.setAttribute('download', filename);
              tempLink.setAttribute('target', '_blank');
              document.body.appendChild(tempLink);
              tempLink.click();
              document.body.removeChild(tempLink);



        	}*/

            /*
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

               var blobURL = window.URL.createObjectURL(blob);
               var tempLink = document.createElement('a');
               tempLink.href = blobURL;
               tempLink.setAttribute('download', filename);
               tempLink.setAttribute('target', '_blank');
               document.body.appendChild(tempLink);
               tempLink.click();
               document.body.removeChild(tempLink);
             }
             */



        })
        .catch(function (error) {
          console.log(error);
        });

}

export function fetchRecent() {

  var url = config.ENDPOINT_URL + 'recentprops';
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
            type: "GET_PROPERTYRECENT",
            data: response.data,
          });

        })
        .catch(function (error) {
          console.log(error);
        });

}

export function fetchSubscriptions() {

  var url = config.ENDPOINT_URL + 'susbcriptions';
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
            type: "GET_SUBSCRIPTION",
            data: response.data,
          });

        })
        .catch(function (error) {
          console.log(error);
        });

}

export function applyCoupon(coupon_code) {

  var url = config.ENDPOINT_URL + 'updatecoupon';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': loginauth.AUTHTOKEN
           },
          data: {
            coupon_code
          }
        })
        .then(function (response) {
          console.log(response);

          dispatcher.dispatch({
            type: "APPLY_COUPON",
            data: response.data,
          });

        })
        .catch(function (error) {
          console.log(error);
        });

}
