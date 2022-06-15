import axios from 'axios';

const API_URL = "https://api-supinfo-3proj-dev.azurewebsites.net";

export default async function deleteAccount(storedToken) {
  const objectToken = JSON.parse(storedToken)
  const token = Object.values(objectToken)
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
  return axios.delete(API_URL + "/users/self", config)
    .then(response => {
      // console.log(response.data)
      return response
    })
    .catch(error => {
      // console.log(error.response.data);
      return error
    });
}