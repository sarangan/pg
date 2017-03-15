import dispatcher from "../dispatcher";
import axios from 'axios';

export function addProperty(data) {

  console.log(data);

  var url = 'http://52.39.72.94:3000/Property/add';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': 'Bearer ' +  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOjYsImlhdCI6MTQ4Njk5MzQyNn0.aGfRrEnbiPSH_1sPhxikafaSdudhr9mSnEGkhCUN6dc'
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

export function getProperty(property_id){

  var url = 'http://52.39.72.94:3000/Property/getProperty';
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

  var url = 'http://52.39.72.94:3000/Property/edit';
  data['property_id'] = property_id;
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': 'Bearer ' +  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOjYsImlhdCI6MTQ4Njk5MzQyNn0.aGfRrEnbiPSH_1sPhxikafaSdudhr9mSnEGkhCUN6dc'
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
