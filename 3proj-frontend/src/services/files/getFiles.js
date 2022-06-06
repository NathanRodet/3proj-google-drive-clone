import axios from 'axios';

const API_URL = "https://api-supinfo-3proj-dev.azurewebsites.net";
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
