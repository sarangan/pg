import dispatcher from "../dispatcher";
import axios from 'axios';

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
