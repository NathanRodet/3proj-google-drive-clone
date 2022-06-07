import axios from 'axios';

// const API_URL = "https://api-supinfo-3proj-dev.azurewebsites.net";
const API_URL = "http://localhost:3001";

export default async function postFile(storedToken, data) {
  const objectToken = JSON.parse(storedToken)
  const token = Object.values(objectToken)
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
  return axios.post(API_URL + "/drive", data, config)
    .then(response => {
      // console.log(response.data)
      return response.data
    })
    .catch(error => {
      // console.log(error.response.data);
      return error
    });
}
