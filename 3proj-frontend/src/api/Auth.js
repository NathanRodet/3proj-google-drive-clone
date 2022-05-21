import axios from 'axios';

const API_URL = "http://localhost:3001";

export default async function postAuth(data) {
  const responseAuth = axios.post(API_URL + "/auth", data)
    .then(response => {
      // console.log(response.data);
      return response
    })
    .catch(error => {
      // console.log(error.response.data);
      return error
    }
    );
  return responseAuth
}
