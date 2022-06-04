import axios from 'axios';

const API_URL = "https://api-supinfo-3proj-dev.azurewebsites.net";

export default async function getFiles(itemStr) {
  const item = JSON.parse(itemStr)
  const token = Object.values(item)
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
  return axios.get(API_URL + "/users", config)
    .then(response => {
      // console.log(response.data)
      return response.data
    })
    .catch(error => {
      // console.log(error.response.data);
      return error
    });
}
