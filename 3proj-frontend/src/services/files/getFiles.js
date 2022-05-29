import axios from 'axios';

const API_URL = "http://localhost:3001";
const config = {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem("JSESSIONID")}`
  }
}

export default async function getFiles() {
  console.log(config.headers)
  // return axios.get(API_URL + "/drive", config)
  //   .then(response => {
  //     console.log(response)
  //     return response
  //   })
  //   .catch(error => {
  //     // console.log(error.response.data);
  //     return error
  //   });
}
