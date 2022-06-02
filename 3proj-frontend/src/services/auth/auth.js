import axios from 'axios';

const API_URL = "https://api-supinfo-3proj-dev.azurewebsites.net";

export default async function postAuth(data) {
  return axios.post(API_URL + "/auth", data)
    .then(response => {
      // console.log(response)
      return response.data
    })
    .catch(error => {
      // console.log(error.response.data);
      return error
    });
}
