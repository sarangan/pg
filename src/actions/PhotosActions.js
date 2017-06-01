import dispatcher from "../dispatcher";
import axios from 'axios';
//import request from 'superagent';
import config from '../config/config';
import loginauth from '../auth/loginauth';

export function fetchPhotos(property_id, master_id) {

  var url =  config.ENDPOINT_URL + 'getPhotosByMaster';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': loginauth.AUTHTOKEN
           },
          data: {
            property_id,
            master_id
          }
        })
        .then(function (response) {
          //console.log(response);
          dispatcher.dispatch({
            type: "GET_PHOTOS",
            data: response.data,
          });

        })
        .catch(function (error) {
          console.log(error);
        });

}

export function fetchPhotosItem(property_id, item_id) {

  var url =  config.ENDPOINT_URL + 'getPhotos';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': loginauth.AUTHTOKEN
           },
          data: {
            property_id,
            item_id
          }
        })
        .then(function (response) {
          //console.log(response);
          dispatcher.dispatch({
            type: "GET_PHOTOS",
            data: response.data,
          });

        })
        .catch(function (error) {
          console.log(error);
        });

}


export function updateDragDrop(photo_id, item_id){

  var url =  config.ENDPOINT_URL + 'updatephotodnd';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': loginauth.AUTHTOKEN
           },
          data: {
            photo_id,
            item_id
          }
        })
        .then(function (response) {

          dispatcher.dispatch({
            type: "UPDATE_PHOTODnD",
            data: response.data
          });

        })
        .catch(function (error) {
          console.log(error);
        });

}


export function deletePhoto(photo_id){
  console.log(photo_id);
  var url =  config.ENDPOINT_URL + 'photodelete';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': loginauth.AUTHTOKEN
           },
          data: {
            photo_id
          }
        })
        .then(function (response) {

          dispatcher.dispatch({
            type: "DELETE_PHOTO",
            data: response.data
          });

        })
        .catch(function (error) {
          console.log(error);
        });

}


export function uploadPhoto(property_id, file, sub_id, type, master_id){

  var url =  config.ENDPOINT_URL + 'uploadfile';
  var data = {
    id: '',
    sync: '',
    property_id: property_id,
    item_id: sub_id,
    parent_id : 'naan',
    type: type
  };

  let formData = new FormData();
  formData.append("property_id", property_id);
  formData.append("item_id", sub_id);
  formData.append("parent_id", master_id);
  formData.append("type", type);
  formData.append("photo", file, file.name);

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
            type: "UPLOAD_PHOTO",
            data: response.data
          });

        })
        .catch(function (error) {
          console.log(error);
        });

}
