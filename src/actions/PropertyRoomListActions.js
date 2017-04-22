import dispatcher from "../dispatcher";
import axios from 'axios';
import config from '../config/config';
import loginauth from '../auth/loginauth';


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
