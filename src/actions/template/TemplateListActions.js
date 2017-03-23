import dispatcher from "../../dispatcher";
import axios from 'axios';

export function fetchTemplateList() {

  var url = 'http://52.39.72.94:3000/Property/getcompanytemplate';
  axios({
          method: 'post',
          url: url,
          headers: {
             'Authorization': 'Bearer ' +  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOjYsImlhdCI6MTQ4Njk5MzQyNn0.aGfRrEnbiPSH_1sPhxikafaSdudhr9mSnEGkhCUN6dc'
           }
        })
        .then(function (response) {
          console.log(response.data);
          dispatcher.dispatch({
            type: "GET_TEMPLATELIST",
            data: response.data,
          });

        })
        .catch(function (error) {
          console.log(error);
        });

}
