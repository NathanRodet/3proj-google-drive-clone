import axios from 'axios';

const API_URL = "http://localhost:3001";

export default async function postUser(data) {
  return axios.post(API_URL + "/users", data)
    .then(response => {
      // console.log(response)
      return response
    })
    .catch(error => {
      // console.log(error.response.data);
      return error
    });
}
