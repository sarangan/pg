import dispatcher from "../dispatcher";
import axios from 'axios';
import request from 'superagent';

export function fetchPhotos(property_id, master_id) {

  var url = 'http://52.39.72.94:3000/Property/getPhotosByMaster';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': 'Bearer ' +  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOjYsImlhdCI6MTQ4Njk5MzQyNn0.aGfRrEnbiPSH_1sPhxikafaSdudhr9mSnEGkhCUN6dc'
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

  var url = 'http://52.39.72.94:3000/Property/getPhotos';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': 'Bearer ' +  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOjYsImlhdCI6MTQ4Njk5MzQyNn0.aGfRrEnbiPSH_1sPhxikafaSdudhr9mSnEGkhCUN6dc'
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

  var url = 'http://52.39.72.94:3000/Property/updatephotodnd';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': 'Bearer ' +  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOjYsImlhdCI6MTQ4Njk5MzQyNn0.aGfRrEnbiPSH_1sPhxikafaSdudhr9mSnEGkhCUN6dc'
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

  var url = 'http://52.39.72.94:3000/Property/photodelete';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': 'Bearer ' +  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOjYsImlhdCI6MTQ4Njk5MzQyNn0.aGfRrEnbiPSH_1sPhxikafaSdudhr9mSnEGkhCUN6dc'
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

  var url = 'http://52.39.72.94:3000/Property/uploadfile';
  var data = {
    id: '',
    sync: '',
    property_id: property_id,
    item_id: sub_id,
    parent_id : 'naan',
    type: type
  };

  var formData = new FormData();
  formData.append("property_id", property_id);
  formData.append("item_id", sub_id);
  formData.append("parent_id", master_id);
  formData.append("type", type);
  formData.append("photo", file, file.name);

  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': 'Bearer ' +  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOjYsImlhdCI6MTQ4Njk5MzQyNn0.aGfRrEnbiPSH_1sPhxikafaSdudhr9mSnEGkhCUN6dc',
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
