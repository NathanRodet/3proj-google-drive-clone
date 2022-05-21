import axios from 'axios';

const API_URL = "http://localhost:3001";

export default async function postAuth(data) {
  console.log(data)
  const responseAuth = axios.post(API_URL + "/auth", data)
    .then(response => {
      console.log(response);
      return response
    })
    .catch(error => {
      console.log(error);
      return error
    }
    );
  return responseAuth
}
