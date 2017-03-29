import dispatcher from "../../dispatcher";
import axios from 'axios';

export function fetchSubitemstemplate(com_master_id) {

  var url = 'http://52.39.72.94:3000/Property/getsubitemstmplate';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': 'Bearer ' +  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOjYsImlhdCI6MTQ4Njk5MzQyNn0.aGfRrEnbiPSH_1sPhxikafaSdudhr9mSnEGkhCUN6dc'
           },
          data: {
            com_master_id
          }
        })
        .then(function (response) {
          dispatcher.dispatch({
            type: "GET_TEMPLATESUBITEMSLIST",
            data: response.data,
          });

        })
        .catch(function (error) {
          console.log(error);
        });

}