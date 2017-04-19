import dispatcher from "../dispatcher";
import axios from 'axios';

export function fetchRoomList(property_id) {

  var url = 'http://52.39.72.94:3000/Property/getRoomlist';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': 'Bearer ' +  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOjYsImlhdCI6MTQ4Njk5MzQyNn0.aGfRrEnbiPSH_1sPhxikafaSdudhr9mSnEGkhCUN6dc'
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

  var url = 'http://52.39.72.94:3000/Property/sortroomlist';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': 'Bearer ' +  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOjYsImlhdCI6MTQ4Njk5MzQyNn0.aGfRrEnbiPSH_1sPhxikafaSdudhr9mSnEGkhCUN6dc'
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
