import dispatcher from "../../dispatcher";
import axios from 'axios';

export function getGeneralConditionsTemplate() {

  var url = 'http://52.39.72.94:3000/Property/getgeneralconditiontemplate';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': 'Bearer ' +  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOjYsImlhdCI6MTQ4Njk5MzQyNn0.aGfRrEnbiPSH_1sPhxikafaSdudhr9mSnEGkhCUN6dc'
           }
        })
        .then(function (response) {

          dispatcher.dispatch({
            type: "GET_GENERALCONDITIONTEMPLATE",
            data: response.data,
          });

        })
        .catch(function (error) {
          console.log(error);
        });

}

export function updateGeneralConditionTemplate(data){

  var url = 'http://52.39.72.94:3000/Property/updategeneralcondition';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': 'Bearer ' +  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOjYsImlhdCI6MTQ4Njk5MzQyNn0.aGfRrEnbiPSH_1sPhxikafaSdudhr9mSnEGkhCUN6dc'
           },
          data: {
            gen_list: data
          }
        })
        .then(function (response) {

          dispatcher.dispatch({
            type: "UPDATE_GENERALCONDITIONLIST",
            data: response.data
          });

        })
        .catch(function (error) {
          console.log(error);
        });

}
