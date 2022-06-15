import axios from 'axios';

const API_URL = "https://api-supinfo-3proj-dev.azurewebsites.net";
console.log(API_URL);
console.log(process.env.REACT_APP_BASEURL);

export default async function postAuth(data) {
  return axios.post(API_URL + "/auth", data)
    .then(response => {
      // console.log(response)
      return response
    })
    .catch(error => {
      // console.log(error.response.data);
      return error
    });
}
