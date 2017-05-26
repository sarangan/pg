import dispatcher from "../dispatcher";
import axios from 'axios';
import config from '../config/config';
import loginauth from '../auth/loginauth';
//master items

export function fetchRoomList(property_id) {

  var url = config.ENDPOINT_URL + 'getRoomlist';
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
          console.log(response.data);
          dispatcher.dispatch({
            type: "GET_ROOMLIST",
            data: response.data,
          });

        })
        .catch(function (error) {
          console.log(error);
        });

}

export function updateSortRoomList(property_id, data){

  var url = config.ENDPOINT_URL + 'sortroomlist';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': loginauth.AUTHTOKEN
           },
          data: {
            property_id,
            room_list: data
          }
        })
        .then(function (response) {
          console.log(response.data);
          // dispatcher.dispatch({
          //   type: "UPDATE_GENERALCONDITIONLIST",
          //   data: response.data
          // });

          //we dont need to pull again

        })
        .catch(function (error) {
          console.log(error);
        });

}

export function updatemasteritem(property_id, master_id, data){

  var url = config.ENDPOINT_URL + 'updatemasteritem';

  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': loginauth.AUTHTOKEN
           },
          data: {
            property_id: property_id,
            prop_master_id: master_id,
            data: data
          }
        })
        .then(function (response) {
          console.log(response.data);
          dispatcher.dispatch({
            type: "UPDATE_MASTERITEM",
            data: response.data,
          });

        })
        .catch(function (error) {
          console.log(error);
        });

}

export function copymasteritem(property_id, master_id, room_name){

  var url = config.ENDPOINT_URL + 'copyroomdetails';

  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': loginauth.AUTHTOKEN
           },
          data: {
            property_id: property_id,
            prop_master_id: master_id,
            room_name: room_name
          }
        })
        .then(function (response) {
          console.log(response.data);
          dispatcher.dispatch({
            type: "COPY_MASTERITEM",
            data: response.data,
          });

        })
        .catch(function (error) {
          console.log(error);
        });

}
