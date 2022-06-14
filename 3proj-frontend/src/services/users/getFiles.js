import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

export default async function getFiles(storedToken) {
  const objectToken = JSON.parse(storedToken)
  const token = Object.values(objectToken)
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
  return axios.get(API_URL + "/drive", config)
    .then(response => {
      // console.log(response.data)
      return response
    })
    .catch(error => {
      // console.log(error.response.data);
      return error
    });
}