import dispatcher from "../dispatcher";
import axios from 'axios';
import config from '../config/config';
import loginauth from '../auth/loginauth';

export function addProperty(data) {

  console.log(data);

  var url = config.ENDPOINT_URL + 'add';
  data['gotImg'] = 'NO';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': loginauth.AUTHTOKEN
           },
          data: data
        })
        .then(function (response) {
          console.log(response);

          dispatcher.dispatch({
            type: "ADD_PROPERTY",
            data: response.data
          });

        })
        .catch(function (error) {
          console.log(error);
        });

}

export function addPropertyWithImg(data) {

  let formData = new FormData();
  formData.append("address_1", data.address_1);
  formData.append("address_2",  data.address_2);
  formData.append("city",  data.city);
  formData.append("postalcode",  data.postalcode);
  formData.append("report_type",  data.report_type);
  formData.append("report_date",  data.report_date);
  formData.append("image_url",  '');
  formData.append("gotImg",  'YES');
  formData.append("logo", data.logo_img, data.logo_img.name);

  var url = config.ENDPOINT_URL + 'add';
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
          console.log(response);

          dispatcher.dispatch({
            type: "ADD_PROPERTY",
            data: response.data
          });

        })
        .catch(function (error) {
          console.log(error);
        });

}

export function getProperty(property_id){

  var url = config.ENDPOINT_URL + 'getProperty';
  axios({
        method: 'post',
        url: url,
        headers: {
           'Authorization': loginauth.AUTHTOKEN
         },
        data: {
          property_id: property_id
        }
      })
      .then(function (response) {
        console.log(response);
        dispatcher.dispatch({
          type: "GET_PROPERTY",
          data: response.data,
        });

      })
      .catch(function (error) {
        console.log(error);
      });

}

export function updateProperty(property_id, data) {

  var url = config.ENDPOINT_URL + 'edit';
  data['property_id'] = property_id;
  data['gotImg'] = 'NO';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': loginauth.AUTHTOKEN
           },
          data: data
        })
        .then(function (response) {

          dispatcher.dispatch({
            type: "UPDATE_PROPERTY",
            data: response.data
          });

        })
        .catch(function (error) {
          console.log(error);
        });

}

export function updatePropertyWithImg(property_id, data) {

  let formData = new FormData();
  formData.append("address_1", data.address_1);
  formData.append("address_2",  data.address_2);
  formData.append("city",  data.city);
  formData.append("postalcode",  data.postalcode);
  formData.append("report_type",  data.report_type);
  formData.append("report_date",  data.report_date);
  formData.append("image_url",  '');
  formData.append("gotImg",  'YES');
  formData.append("property_id",  property_id);
  formData.append("logo", data.logo_img, data.logo_img.name);

  var url = config.ENDPOINT_URL + 'edit';
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
            type: "UPDATE_PROPERTY",
            data: response.data
          });

        })
        .catch(function (error) {
          console.log(error);
        });

}
